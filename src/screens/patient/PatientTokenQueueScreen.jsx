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
import {styless} from './PatientTokenQueueScreen.styles';
import {usePatientTokenManager} from '../../hooks/usePatientTokenManager';
import DefaultReceptionScreen from '../noTokenReceptionState/DefaultReceptionScreen';
import {TranslateNameToHindi} from '../../services/langTranslationService';
import FooterNavigation from '../../components/tabNavigationFooter/TabNavigationFooter';
import {UpdateTokenRequest} from '../../services/tokenService';
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

  const handleTokenUpdate = useCallback(
    async ( updatedTokenStatusDataObj) => {
      try {
        await UpdateTokenRequest(updatedTokenStatusDataObj);
        await refetchTokens();
      } catch (updateError) {
        console.error('Error updating token status:', updateError);
      }
    },
    [refetchTokens],
  );
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
            <TouchableOpacity style={[styles.badge, styles.redBadge]}>
              <Text style={styles.badgeText}>On Hold: {onHold}</Text>
            </TouchableOpacity>
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
            handleTokenUpdate={handleTokenUpdate}
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
import {Switch, Alert} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const statusOptions = [
  {label: 'Waiting', value: 'Waiting'},
  {label: 'In Progress', value: 'In Progress'},
  {label: 'On Hold', value: 'On Hold'},
];

const TokenCard = React.memo(
  ({token, isSelected, onPress, onLongPress, translateToHindi , handleTokenUpdate}) => {
    const [hindiName, setHindiName] = useState('');
    const [isPaid, setIsPaid] = useState(token.fee_status === 'Paid');

    useEffect(() => {
      if (token.patient_name && !hindiName) {
        translateToHindi(token.patient_name)
          .then(setHindiName)
          .catch(() => setHindiName(''));
      }
    }, [token.patient_name, hindiName, translateToHindi]);

    const handleStatusChange = async  item => {
      Alert.alert(
        'Confirm Status Change',
        `Are you sure you want to change status from ${token.status} to ${item.value}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {
              console.log(`Updating status to ${item.value}`);
              // Add your API call here to update the status
            },
          },
        ],
      );
      const updateTokenDataObj = {
        ...token,
        status: item.value,
      };
      await handleTokenUpdate(updateTokenDataObj);
    };

    const handlePaymentToggle = async value => {
      const newStatus = value ? 'Paid' : 'Not Paid';
      Alert.alert(
        'Confirm Payment Change',
        `Are you sure you want to change payment status from ${token.fee_status} to ${newStatus}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {}, // Keep current state
          },
          {
            text: 'Confirm',
            onPress: () => {
              console.log(`Updating payment status to ${newStatus}`);
              setIsPaid(value);
              // Add your API call here to update payment status
            },
          },
        ],
      );
      const updateTokenDataObj = {
        ...token,
        fee_status: newStatus,
      };
      await handleTokenUpdate(updateTokenDataObj);
    };
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
          <View style={styles.tokenNumber}>
            <Text>
              {new Date(token.created_date).toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Text style={styles.tokenNumberText}>{token.token_no}</Text>
          </View>
        </View>

        <View style={styles.tokenDetails}>
          <Text style={styles.detailText}>
            {token.mobile_number?.replace(
              /(\d{3})(\d{3})(\d{4})/,
              'xxx-xxx-$3',
            )}
          </Text>

          {/* Payment Switch - Small version */}
          <View style={styles.paymentSwitchContainer}>
            <Switch
              value={isPaid}
              onValueChange={handlePaymentToggle}
              trackColor={{false: '#ff7675', true: '#55efc4'}}
              thumbColor={isPaid ? '#00b894' : '#d63031'}
              style={styles.smallSwitch}
            />
            <Text
              style={[
                styles.paymentStatus,
                isPaid ? styles.paidText : styles.notPaidText,
              ]}>
              {isPaid ? 'Paid' : 'Not Paid'}
            </Text>
          </View>

          {/* Improved Status Dropdown */}
          <View style={styles.statusDropdownContainer}>
            <Dropdown
              style={styles.statusDropdown}
              placeholder=""
              data={statusOptions}
              labelField="label"
              valueField="value"
              value={token.status}
              onChange={handleStatusChange}
              renderItem={item => (
                <View style={styles.dropdownItem}>
                  <View
                    style={[
                      styles.smallStatusDot, // Changed to smallStatusDot
                      item.value === 'In Progress' && styles.greenDot,
                      item.value === 'On Hold' && styles.redDot,
                      item.value === 'Waiting' && styles.yellowDot,
                    ]}
                  />
                  <Text style={styles.smallDropdownItemText}>{item.label}</Text>
                </View>
              )}
              renderSelectedItem={item => (
                <View style={styles.selectedStatus}>
                  <View
                    style={[
                      styles.smallStatusDot, // Changed to smallStatusDot
                      item.value === 'In Progress' && styles.greenDot,
                      item.value === 'On Hold' && styles.redDot,
                      item.value === 'Waiting' && styles.yellowDot,
                    ]}
                  />
                  <Text style={styles.smallStatusText}>{item.label}</Text>
                </View>
              )}
              itemTextStyle={styles.smallDropdownItemText} // Added
              selectedTextStyle={styles.smallStatusText} // Added
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

// Add these to your existing styles
const additionalStyles = {
  paymentSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  smallSwitch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
  paymentStatus: {
    fontSize: 14,
  },
  paidText: {
    color: 'green',
  },
  notPaidText: {
    color: 'red',
  },

  dropdownItemText: {
    marginLeft: 8,
    fontSize: 14,
  },

  // ... keep existing payment switch styles ...

  // Status dropdown small styles
  statusDropdownContainer: {
    width: 110, // Reduced from 120
  },
  statusDropdown: {
    backgroundColor: 'white',
    borderRadius: 6, // Reduced from 8
    padding: 6, // Reduced from 8
    height: 30, // Added fixed height
  },
  smallStatusDot: {
    width: 8, // Reduced from 10
    height: 8, // Reduced from 10
    borderRadius: 4, // Reduced from 5
    marginRight: 4, // Reduced from 5
  },
  smallStatusText: {
    fontSize: 12, // Reduced from 14
    marginLeft: 4, // Reduced from 8
  },
  smallDropdownItemText: {
    fontSize: 12, // Reduced from 14
  },
  dropdownItem: {
    padding: 8, // Reduced from 10
    flexDirection: 'row',
    alignItems: 'center',
    height: 30, // Added fixed height
  },
  selectedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30, // Added fixed height
  },
};

// Merge with existing styles
const styles = {
  ...styless, // Your existing styles
  ...additionalStyles,
};

export default withQueryClientProvider(PatientTokenQueueScreen);
