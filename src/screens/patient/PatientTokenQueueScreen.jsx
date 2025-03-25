import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useAtomValue } from 'jotai';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import {
  Phone, 
  Pause, 
  RefreshCw, 
  ArrowLeft, 
  UserCircle, 
  Home, 
  FileText, 
  LogOut, 
  CalendarDays, 
  Building2, 
  User, 
  UserPlus
} from 'lucide-react-native';
import {styles} from './PatientTokenQueueScreen.styles';
import {usePatientTokenManager} from '../../hooks/usePatientTokenManager';
import DefaultReceptionScreen from '../noTokenReceptionState/DefaultReceptionScreen';
import { doctorInfoAtom } from '../../atoms/doctorAtoms/doctorAtom';
import useOrientationLocker from '../../hooks/useOrientationLocker';
import { getInitials } from '../../utils/getInitials';


const PatientTokenQueueScreen = ({navigation, route}) => {
  useOrientationLocker('LANDSCAPE');
  const {clinic_id, doctor_id} = route.params;
  const doctorData = useAtomValue(doctorInfoAtom);
  const doctorInitials = getInitials(doctorData.doctor_name);
  
  const [showDoctorOptions, setShowDoctorOptions] = useState(false);
  const dropdownRef = useRef(null);
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);
  const doubleTapTimeout = useRef(null); // Add this line
  const [isLoading, setIsLoading] = useState(true); // Add this line if missing
  const {
    patientTokens,
    selectedTokenId,
    isRecallEnabled,
    isNextDone,
    handleSelectToken,
    handleNext,
    handleRecall,
    handleDone,
  } = usePatientTokenManager(clinic_id, doctor_id);

  // Calculate counts
  const totalPatients = patientTokens?.length || 0;
  const attendedPatients = patientTokens?.filter(t => t.status === 'In Progress').length || 0;
  const inQueue = patientTokens?.filter(t => t.status === 'Waiting').length || 0;
  const onHold = patientTokens?.filter(t => t.status === 'On Hold').length || 0;

  const handleRowPress = tokenId => {
    if (doubleTapTimeout.current) {
      clearTimeout(doubleTapTimeout.current);
      doubleTapTimeout.current = null;
      handleSelectToken(tokenId);
    } else {
      // First tap, set a timeout for double tap detection
      doubleTapTimeout.current = setTimeout(() => {
        doubleTapTimeout.current = null;
      }, 300);
    }
  };

  const handleLongPress = (token) => {
    // Open patient info
    navigation.navigate('PatientInfoEditor', { patientInfo: token });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    if (patientTokens !== undefined) {
      setIsLoading(false);
    }
  }, [navigation, patientTokens]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (patientTokens.length === 0) {
    return <DefaultReceptionScreen />;
  }

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Token List</Text>
        <View style={styles.headerBadges} ref={dropdownRef}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Total: {totalPatients}</Text>
          </View>
          <View style={[styles.badge, styles.greenBadge]}>
            <Text style={styles.badgeText}>Attended: {attendedPatients}</Text>
          </View>
          <View style={[styles.badge, styles.yellowBadge]}>
            <Text style={styles.badgeText}>In Queue: {inQueue}</Text>
          </View>
          <View style={[styles.badge, styles.redBadge]}>
            <Text style={styles.badgeText}>On Hold: {onHold}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowDoctorOptions(!showDoctorOptions)}>
            <UserCircle size={24} color="#333" />
          </TouchableOpacity>
          {showDoctorOptions && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem}>
                <User size={16} color="#333" />
                <Text style={styles.dropdownText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Building2 size={16} color="#333" />
                <Text style={styles.dropdownText}>Clinic</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <CalendarDays size={16} color="#333" />
                <Text style={styles.dropdownText}>Schedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <LogOut size={16} color="#333" />
                <Text style={styles.dropdownText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={isNextDone ? handleDone : handleNext}>
          <Phone size={16} color="white" />
          <Text style={styles.buttonText}>{isNextDone ? 'Done' : 'Call Next'}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleRecall}
          disabled={!isRecallEnabled}>
          <Pause size={16} color="#333" />
          <Text style={styles.secondaryButtonText}>Recall</Text>
        </TouchableOpacity>
      </View>

      {/* Token List */}
      <ScrollView style={styles.tokenListContainer}>
        {patientTokens.map(token => (
          <TouchableOpacity 
            key={token.token_id}
            style={[
              styles.tokenCard,
              token.status === 'In Progress' && styles.inProgressCard,
              token.status === 'On Hold' && styles.onHoldCard,
              selectedTokenId === token.token_id && styles.selectedCard
            ]}
            onPress={() => handleRowPress(token.token_id)}
            onLongPress={() => handleLongPress(token)}
            delayLongPress={500} // 500ms press duration to trigger long press
            >
            <View style={styles.tokenHeader}>
              <Text style={styles.patientName}>{token.patient_name}</Text>
              <Text style={styles.tokenNumber}>{token.token_no}</Text>
            </View>
            <View style={styles.tokenDetails}>
              <Text style={styles.detailText}>{token.mobile_number?.replace(/(\d{3})(\d{3})(\d{4})/, 'xxx-xxx-$3')}</Text>
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
            {token.fee_status && (
              <Text style={styles.paymentStatus}>
                {token.fee_status === 'Paid' ? '✅ Paid' : '❌ Not Paid'}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footerNavigation}>
        <TouchableOpacity style={styles.footerButton}>
          <UserPlus size={20} color="#333" />
          <Text style={styles.footerButtonText}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Home size={20} color="#333" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FileText size={20} color="#333" />
          <Text style={styles.footerButtonText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <RefreshCw size={20} color="#333" />
          <Text style={styles.footerButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Side Panel Modal */}
      <Modal
        transparent={true}
        visible={isSidePanelVisible}
        onRequestClose={() => setSidePanelVisible(false)}>
        {/* Your existing side panel implementation */}
      </Modal>
    </SafeAreaView>
  );
};

export default  withQueryClientProvider(PatientTokenQueueScreen);