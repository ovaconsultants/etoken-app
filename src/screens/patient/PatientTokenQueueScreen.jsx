import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import {
  Phone,
  Nfc,
  RefreshCw,
  Home,
  FileText,
  UserPlus,
} from 'lucide-react-native';
import {styles} from './PatientTokenQueueScreen.styles';
import {usePatientTokenManager} from '../../hooks/usePatientTokenManager';
import DefaultReceptionScreen from '../noTokenReceptionState/DefaultReceptionScreen';

const PatientTokenQueueScreen = ({navigation, route}) => {
  // State initialization
  const {clinic_id, doctor_id} = route.params;
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
    refetchTokens,
    isFetching,
    isError,
    error,
  } = usePatientTokenManager(clinic_id, doctor_id);

  // Memoized derived values
  const onHoldOptions = useMemo(
    () =>
      patientTokens
        .filter(t => t.status === 'On Hold')
        .map(patient => ({
          label: `${patient.patient_name} (${patient.token_no})`,
          value: patient.token_id,
        })),
    [patientTokens],
  );

  const {totalPatients, attendedPatients, inQueue, onHold, hasTokenInProgress} =
    useMemo(() => {
      const inProgressTokens = patientTokens.filter(
        t => t.status === 'In Progress',
      );
      return {
        totalPatients: patientTokens.length,
        attendedPatients: inProgressTokens.length,
        inQueue: patientTokens.filter(t => t.status === 'Waiting').length,
        onHold: patientTokens.filter(t => t.status === 'On Hold').length,
        hasTokenInProgress: inProgressTokens.length > 0,
      };
    }, [patientTokens]);

  // Event handlers
  const handleRowPress = useCallback(
    tokenId => {
      if (doubleTapTimeout.current) {
        clearTimeout(doubleTapTimeout.current);
        doubleTapTimeout.current = null;
        handleSelectToken(tokenId);
      } else {
        doubleTapTimeout.current = setTimeout(() => {
          doubleTapTimeout.current = null;
        }, 300);
      }
    },
    [handleSelectToken],
  );

  const handleLongPress = useCallback(
    token => {
      navigation.navigate('PatientInfoEditor', {patientInfo: token});
    },
    [navigation],
  );

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    try {
      await refetchTokens();
      setIsLoading(false);
    } catch (error) {
      console.error('Error refreshing tokens:', error);
    }
  }, [refetchTokens]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible(prev => !prev);
  }, []);

  // Side effects
  useEffect(() => {
    if (patientTokens !== undefined) {
      setIsLoading(false);
    }
  }, [patientTokens]);

  if (isError) {
    return <LoadingErrorHandler isError={true} error={error} />;
  }

  if (patientTokens.length === 0) {
    return <DefaultReceptionScreen navigation={navigation} />;
  }

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <LoadingErrorHandler
        isLoading={isLoading && isFetching && patientTokens.length > 0}
        isInline={true}
      />
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
              disabled={onHoldOptions.length === 0}>
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
                      }}>
                      <Text style={styles.dropdownItemText}>
                        {option.label}
                      </Text>
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
          onPress={hasTokenInProgress ? handleDone : handleNext}>
          <Phone size={16} color="white" />
          <Text style={styles.buttonText}>
            {hasTokenInProgress ? 'Done' : 'Call Next'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleRecall}
          disabled={!isRecallEnabled}>
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

      <FooterNavigation
        navigation={navigation}
        doctor_id={doctor_id}
        clinic_id={clinic_id}
        handleRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};
// Memoized Components for better performance
const TokenCard = React.memo(({token, isSelected, onPress, onLongPress}) => {
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
      delayLongPress={500}>
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
          <View
            style={[
              styles.statusDot,
              token.status === 'In Progress' && styles.greenDot,
              token.status === 'On Hold' && styles.redDot,
              token.status === 'Waiting' && styles.yellowDot,
            ]}
          />
          <Text style={styles.statusText}>{token.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const FooterNavigation = React.memo(
  ({navigation, doctor_id, clinic_id, handleRefresh}) => {
    const handleFooterPress = screenName => {
      switch (screenName) {
        case 'New':
          navigation.navigate('Reception', {
            doctor_id: doctor_id,
            clinic_id: clinic_id,
          });
          break;
        case 'Home':
          navigation.navigate('Home');
          break;
        case 'Report':
          navigation.navigate('ReportsScreen');
          break;
        case 'Refresh':
          handleRefresh();
          break;
        default:
          console.warn(`No screen defined for ${screenName}`);
      }
    };

    return (
      <View style={styles.footerNavigation}>
        <FooterButton
          icon={UserPlus}
          label="New"
          onPress={() => handleFooterPress('New')}
        />
        <FooterButton
          icon={Home}
          label="Home"
          onPress={() => handleFooterPress('Home')}
        />
        <FooterButton
          icon={FileText}
          label="Report"
          onPress={() => handleFooterPress('Report')}
        />
        <FooterButton
          icon={RefreshCw}
          label="Refresh"
          onPress={() => handleFooterPress('Refresh')}
        />
      </View>
    );
  },
);

const FooterButton = React.memo(({icon: Icon, label, onPress}) => {
  return (
    <TouchableOpacity style={styles.footerButton} onPress={onPress}>
      <Icon size={20} color="#333" />
      <Text style={styles.footerButtonText}>{label}</Text>
    </TouchableOpacity>
  );
});

export default withQueryClientProvider(PatientTokenQueueScreen);
