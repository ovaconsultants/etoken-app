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
import {TranslateNameToHindi} from '../../services/langTranslationService';
import FooterNavigation from '../../components/tabNavigationFooter/TabNavigationFooter';
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
    } catch (refreshError) {
      console.error('Error refreshing tokens:', refreshError);
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
            translateToHindi={TranslateNameToHindi}
            onPress={() => handleRowPress(token.token_id)}
            onLongPress={() => handleLongPress(token)}
          />
        ))}
      </ScrollView>

      <FooterNavigation
        navigation={navigation}
        currentRoute="PatientTokenQueue"
        handleRefresh={handleRefresh}
        routes={[
          {
            id: 'new',
            icon: UserPlus,
            label: 'New',
            screen: 'Reception',
            params: {doctor_id, clinic_id},
          },
          {
            id: 'home',
            icon: Home,
            label: 'Home',
            screen: 'Home',
          },
          {
            id: 'report',
            icon: FileText,
            label: 'Report',
            screen: 'ReportsScreen',
          },
          {
            id: 'refresh',
            icon: RefreshCw,
            label: 'Refresh',
            action: 'refresh',
          },
        ]}
      />
    </SafeAreaView>
  );
};
// Memoized Components for better performance
const TokenCard = React.memo(
  ({token, isSelected, onPress, onLongPress, translateToHindi}) => {
    const [hindiName, setHindiName] = useState('');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showFeeDropdown, setShowFeeDropdown] = useState(false);
    const handleStatusChange = newStatus => {
      // Call API to update status
      console.log(`Updating status to ${newStatus}`);
      setShowStatusDropdown(false);
    };

    const handleFeeStatusChange = newFeeStatus => {
      // Call API to update fee status
      console.log(`Updating fee status to ${newFeeStatus}`);
      setShowFeeDropdown(false);
    };
    useEffect(() => {
      // Only translate if name exists and hindiName isn't already set
      if (token.patient_name && !hindiName) {
        TranslateNameToHindi(token.patient_name)
          .then(setHindiName)
          .catch(() => setHindiName(''));
      }
    }, [hindiName, token.patient_name]);
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
          <View style={styles.patientName}>
            <Text>{token.patient_name}</Text>
            <Text>( {hindiName || ''} )</Text>
          </View>
          <Text>
            {new Date(token.created_date).toLocaleTimeString('en-US', {
              hour12: true, // Show AM/PM
              hour: '2-digit', // e.g., "03" instead of "3"
              minute: '2-digit', // e.g., "08" instead of "8"
            })}
          </Text>

          <Text style={styles.tokenNumber}>{token.token_no}</Text>
        </View>
        <View style={styles.tokenDetails}>
          <Text style={styles.detailText}>
            {token.mobile_number?.replace(
              /(\d{3})(\d{3})(\d{4})/,
              'xxx-xxx-$3',
            )}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowFeeDropdown(!showFeeDropdown);
              setShowStatusDropdown(false); // Close other dropdown if open
            }}
            style={styles.paymentStatusContainer}>
            <Text
              style={[
                styles.paymentStatus,
                token.fee_status === 'Paid'
                  ? styles.paidText
                  : styles.notPaidText,
              ]}>
              {token.fee_status === 'Paid' ? 'Paid' : 'Not Paid'}
            </Text>

            {showFeeDropdown && (
              <View style={[styles.dropdownMenu, {top: 25, right: 0}]}>
                <TouchableOpacity
                  style={styles.dropdownMenuItem}
                  onPress={() => handleFeeStatusChange('Paid')}>
                  <Text style={styles.dropdownMenuItemText}>Mark as Paid</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownMenuItem}
                  onPress={() => handleFeeStatusChange('Not Paid')}>
                  <Text style={styles.dropdownMenuItemText}>
                    Mark as Not Paid
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.statusContainer}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowFeeDropdown(false); // Close other dropdown if open
              }}>
              <View
                style={[
                  styles.statusDot,
                  token.status === 'In Progress' && styles.greenDot,
                  token.status === 'On Hold' && styles.redDot,
                  token.status === 'Waiting' && styles.yellowDot,
                ]}
              />
              <Text style={styles.statusText}>{token.status}</Text>
            </TouchableOpacity>

            {showStatusDropdown && (
              <View style={[styles.dropdownMenu, {top: 25, left: 0}]}>
                <TouchableOpacity
                  style={styles.dropdownMenuItem}
                  onPress={() => handleStatusChange('Waiting')}>
                  <Text style={styles.dropdownMenuItemText}>Waiting</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownMenuItem}
                  onPress={() => handleStatusChange('In Progress')}>
                  <Text style={styles.dropdownMenuItemText}>In Progress</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownMenuItem}
                  onPress={() => handleStatusChange('On Hold')}>
                  <Text style={styles.dropdownMenuItemText}>On Hold</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export default withQueryClientProvider(PatientTokenQueueScreen);
