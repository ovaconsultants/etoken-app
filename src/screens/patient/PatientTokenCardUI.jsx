import {Switch, View, TouchableOpacity, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import React, {useState, useCallback, useEffect} from 'react';
import {formatTokenTime, maskPhoneNumber} from '../../utils/globalUtil';
import {BadgeIndianRupee, BadgeX} from 'lucide-react-native';
import { green } from 'react-native-reanimated/lib/typescript/Colors';

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
    updateToken,
    styles,
  }) => {
    const [hindiName, setHindiName] = useState('');
    const [paidStatus, setPaidStatus] = useState(token.fee_status === 'Paid');
    const [status, setStatus] = useState(token.status);

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
      setStatus(item.value);
      const updateTokenDataObj = {
        ...token,
        status: item.value,
      };
      await updateToken(updateTokenDataObj);
    };

    const handlePaymentToggle = async () => {
      const newStatus = !paidStatus; // Toggle the current state
      setPaidStatus(newStatus); // Update local state immediately

      try {
        const updateTokenDataObj = {
          ...token,
          fee_status: newStatus ? 'Paid' : 'Not Paid',
        };
        await updateToken(updateTokenDataObj);
      } catch (error) {
        // If API call fails, revert the state
        setPaidStatus(!newStatus);
        console.error('Failed to update payment status:', error);
      }
    };

    return (
      <>
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
              <Text>{formatTokenTime(token.created_date)}</Text>
              <Text style={styles.tokenNumberText}>{token.token_no}</Text>
            </View>
          </View>

          <View style={styles.tokenDetails}>
            <Text style={styles.detailText}>
              {maskPhoneNumber(token.mobile_number)}
            </Text>

            {/* Payment Switch */}
            <View style={styles.paymentSwitchContainer}>
              <Switch
                value={paidStatus}
                onValueChange={handlePaymentToggle}
                trackColor={{false: 'blue', true: 'grey'}}
                thumbColor={paidStatus ? '#27AE60' : '#d63031'}
                style={styles.smallSwitch}
              />
              {paidStatus ? <BadgeIndianRupee color={'#27AE60'}/> : <BadgeX  color={'#d63031'}/>}
              <Text style={styles.paymentStatus &&  paidStatus ? styles.paidStatusTextColor : styles.notPaidStatusTextColor}>
                Paid
              </Text>
            </View>

            {/* Status Dropdown */}
            <View style={styles.statusDropdownContainer}>
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                itemContainerStyle={styles.itemContainer}
                placeholder={token.status}
                placeholderStyle={styles.placeholderText}
                selectedTextStyle={styles.selectedStatusText}
                data={statusOptions.filter(item => item.value !== token.status)}
                labelField="label"
                valueField="value"
                value={status}
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
                    <Text style={styles.smallDropdownItemText}>
                      {item.label}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  },
);
