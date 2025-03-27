import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from 'react-native';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import { Phone, Nfc, RefreshCw, Home, FileText, UserPlus } from 'lucide-react-native';
import { styles } from './PatientTokenQueueScreen.styles';
import { usePatientTokenManager } from '../../hooks/usePatientTokenManager';
import DefaultReceptionScreen from '../noTokenReceptionState/DefaultReceptionScreen';
import { sidePanelStyles } from './PatientTokenQueueScreen.styles';

const PatientTokenQueueScreen = ({ navigation, route }) => {
  // State initialization
  const { clinic_id, doctor_id } = route.params;
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const doubleTapTimeout = useRef(null);

  // Token management
  const {
    patientTokens = [],
    selectedTokenId,
    isRecallEnabled,
    handleSelectToken,
    handleNext,
    handleRecall,
    handleDone,
  } = usePatientTokenManager(clinic_id, doctor_id);

  // Memoized derived values
  const onHoldOptions = useMemo(() => (
    patientTokens
      .filter(t => t.status === 'On Hold')
      .map(patient => ({
        label: `${patient.patient_name} (${patient.token_no})`,
        value: patient.token_id,
      }))
  ), [patientTokens]);

  const { totalPatients, attendedPatients, inQueue, onHold, hasTokenInProgress } = useMemo(() => {
    const inProgressTokens = patientTokens.filter(t => t.status === 'In Progress');
    return {
      totalPatients: patientTokens.length,
      attendedPatients: inProgressTokens.length,
      inQueue: patientTokens.filter(t => t.status === 'Waiting').length,
      onHold: patientTokens.filter(t => t.status === 'On Hold').length,
      hasTokenInProgress: inProgressTokens.length > 0,
    };
  }, [patientTokens]);

  // Event handlers
  const handleRowPress = useCallback((tokenId) => {
    if (doubleTapTimeout.current) {
      clearTimeout(doubleTapTimeout.current);
      doubleTapTimeout.current = null;
      handleSelectToken(tokenId);
    } else {
      doubleTapTimeout.current = setTimeout(() => {
        doubleTapTimeout.current = null;
      }, 300);
    }
  }, [handleSelectToken]);

  const handleLongPress = useCallback((token) => {
    navigation.navigate('PatientInfoEditor', { patientInfo: token });
  }, [navigation]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible(prev => !prev);
  }, []);

  // Side effects
  useEffect(() => {
    if (patientTokens !== undefined) {
      setIsLoading(false);
    }
  }, [patientTokens]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (patientTokens.length === 0) {
    return <DefaultReceptionScreen navigation={navigation} />;
  }

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBadges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Total: {totalPatients}</Text>
          </View>
          <View style={[styles.badge, styles.greenBadge]}>
            <Text style={styles.badgeText}>Attended: {attendedPatients}</Text>
          </View>
          <View style={[styles.badge, styles.yellowBadge]}>
            <Text style={styles.badgeText}>In Queue: {inQueue}</Text>
          </View>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              style={[styles.badge, styles.redBadge]}
              onPress={toggleDropdown}
              disabled={onHoldOptions.length === 0}
            >
              <Text style={styles.badgeText}>On Hold: {onHold}</Text>
            </TouchableOpacity>
            {isDropdownVisible && (
              <View style={styles.dropdownContent}>
                <ScrollView style={styles.dropdownScroll}>
                  {onHoldOptions.map(option => (
                    <TouchableOpacity
                      key={option.value}
                      style={styles.dropdownItem}
                      onPress={() => {
                        handleSelectToken(option.value);
                        setIsDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={hasTokenInProgress ? handleDone : handleNext}
        >
          <Phone size={16} color="white" />
          <Text style={styles.buttonText}>
            {hasTokenInProgress ? 'Done' : 'Call Next'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleRecall}
          disabled={!isRecallEnabled}
        >
          <Nfc size={16} color="#333" />
          <Text style={styles.secondaryButtonText}>Recall</Text>
        </TouchableOpacity>
      </View>

      {/* Token List */}
      <ScrollView style={styles.tokenListContainer}>
        {patientTokens.map(token => (
          <TokenCard
            key={token.token_id}
            token={token}
            isSelected={selectedTokenId === token.token_id}
            onPress={() => handleRowPress(token.token_id)}
            onLongPress={() => handleLongPress(token)}
          />
        ))}
      </ScrollView>
      <FooterNavigation />
      <SidePanel 
        visible={isSidePanelVisible} 
        onClose={() => setSidePanelVisible(false)} 
      />
    </SafeAreaView>
  );
};

// Memoized Components for better performance
const TokenCard = React.memo(({ token, isSelected, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.tokenCard,
        token.status === 'In Progress' && styles.inProgressCard,
        token.status === 'On Hold' && styles.onHoldCard,
        isSelected && styles.selectedCard,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
    >
      <View style={styles.tokenHeader}>
        <Text style={styles.patientName}>{token.patient_name}</Text>
        <Text style={styles.tokenNumber}>{token.token_no}</Text>
      </View>
      <View style={styles.tokenDetails}>
        <Text style={styles.detailText}>
          {token.mobile_number?.replace(/(\d{3})(\d{3})(\d{4})/, 'xxx-xxx-$3')}
        </Text>
        {token.fee_status && (
          <Text style={styles.paymentStatus}>
            {token.fee_status === 'Paid' ? 'Paid' : 'Not Paid'}
          </Text>
        )}
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusDot,
            token.status === 'In Progress' && styles.greenDot,
            token.status === 'On Hold' && styles.redDot,
            token.status === 'Waiting' && styles.yellowDot,
          ]} />
          <Text style={styles.statusText}>{token.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const FooterNavigation = React.memo(() => {
  return (
    <View style={styles.footerNavigation}>
      <FooterButton icon={UserPlus} label="New" />
      <FooterButton icon={Home} label="Home" />
      <FooterButton icon={FileText} label="Report" />
      <FooterButton icon={RefreshCw} label="Refresh" />
    </View>
  );
});

const FooterButton = React.memo(({ icon: Icon, label }) => {
  return (
    <TouchableOpacity style={styles.footerButton}>
      <Icon size={20} color="#333" />
      <Text style={styles.footerButtonText}>{label}</Text>
    </TouchableOpacity>
  );
});

const SidePanel = React.memo(({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={sidePanelStyles.overlay}>
        <View style={sidePanelStyles.sidePanel}>
          <TouchableOpacity style={sidePanelStyles.sidePanelButton}>
            <Text style={sidePanelStyles.sidePanelButtonText}>List Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={sidePanelStyles.sidePanelButton}>
            <Text style={sidePanelStyles.sidePanelButtonText}>LogOut</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sidePanelStyles.closeButton}
            onPress={onClose}
          >
            <Text style={sidePanelStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

export default withQueryClientProvider(PatientTokenQueueScreen);