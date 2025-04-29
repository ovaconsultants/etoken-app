// Memoized Components for better performance
import {Switch, Alert, View, TouchableOpacity, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import React, {useState, useCallback, useEffect} from 'react';

const statusOptions = [
  {label: 'Waiting', value: 'Waiting'},
  {label: 'In Progress', value: 'In Progress'},
  {label: 'Completed', value: 'Completed'},
  {label: 'Cancelled', value: 'Cancelled'},
  {label: 'On Hold', value: 'On Hold'},
];

export const TokenCard = React.memo(
  ({
    token,
    isSelected,
    onPress,
    onLongPress,
    translateNameToHindi,
    handleTokenUpdate,
    styles,
  }) => {
    const [pendingStatus, setPendingStatus] = useState(null);
    const [pendingPayment, setPendingPayment] = useState(null);
    const [hindiName, setHindiName] = useState('');
    const [isPaid, setIsPaid] = useState(token.fee_status === 'Paid');
    const memoizedTranslate = useCallback(
      name => {
        return translateNameToHindi(name) || null;
      },
      [translateNameToHindi],
    );
    useEffect(() => {
      if (token.patient_name && !hindiName) {
        memoizedTranslate(token.patient_name)
          .then(setHindiName)
          .catch(() => setHindiName(''));
      }
    }, [token.patient_name, hindiName, memoizedTranslate]);

    const handleStatusChange = async item => {
      setPendingStatus(item.value);

      Alert.alert(
        'Confirm Status Change',
        `Are you sure you want to change status from ${token.status} to ${item.value}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setPendingStatus(null),
          },
          {
            text: 'Confirm',
            onPress: async () => {
              console.log(`Updating status to ${item.value}`);
              const updateTokenDataObj = {
                ...token,
                status: item.value,
              };
              await handleTokenUpdate(updateTokenDataObj);
              setPendingStatus(null);
            },
          },
        ],
      );
    };

    const handlePaymentToggle = async value => {
      setPendingPayment(value);
      const newStatus = value ? 'Paid' : 'Not Paid';
      Alert.alert(
        'Confirm Payment Change',
        `Are you sure you want to change payment status from ${token.fee_status} to ${newStatus}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setPendingPayment(null), // Keep current state
          },
          {
            text: 'Confirm',
            onPress: async () => {
              console.log(`Updating payment status to ${newStatus}`);
              setIsPaid(value);
              const updateTokenDataObj = {
                ...token,
                fee_status: newStatus,
              };
              await handleTokenUpdate(updateTokenDataObj);
            },
          },
        ],
      );
    };

    return (
      <TouchableOpacity
        style={[
          styles.tokenCard,
          token.status === 'In Progress' && styles.inProgressCard,
          token.status === 'On Hold' && styles.onHoldCard,
          token.status === 'Waiting' && styles.waitingCard,
          token.status === 'Completed' && styles.completedCard,
          token.status === 'Cancelled' && styles.cancelledCard,
          isSelected && styles.selectedCard,
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={500}>
        <View style={styles.tokenHeader}>
          <View style={styles.patientName}>
            <Text>{token.patient_name}</Text>
            <Text>{hindiName || ''}</Text>
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
              value={pendingPayment || isPaid}
              onValueChange={handlePaymentToggle}
              trackColor={{false: 'grey', true: 'grey'}}
              thumbColor={isPaid ? '#27AE60' : '#d63031'}
              style={styles.smallSwitch}
            />
            <Text style={styles.paymentStatus}>
              {isPaid ? 'Paid' : 'Not Paid'}
            </Text>
          </View>

          {/* Improved Status Dropdown */}
          <View style={styles.statusDropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholder={token.status}
              placeholderStyle={styles.placeholderText}
              selectedTextStyle={styles.selectedStatusText}
              data={statusOptions.filter(item => item.value !== token.status)}
              labelField="label"
              valueField="value"
              value={pendingStatus || token.status}
              onChange={handleStatusChange}
              renderItem={item => (
                <View style={styles.dropdownItem}>
                  <View
                    style={[
                      styles.smallStatusDot,
                      item.value === 'In Progress' && styles.greenDot,
                      item.value === 'On Hold' && styles.orangeDot,
                      item.value === 'Waiting' && styles.yellowDot,
                      item.value === 'Completed' && styles.blueDot,
                      item.value === 'Cancelled' && styles.redDot,
                    ]}
                  />
                  <Text style={styles.smallDropdownItemText}>{item.label}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);
