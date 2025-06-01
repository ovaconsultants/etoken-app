import { View, TouchableOpacity, Text} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';


import {GetPatientImage} from '../../services/patientImagesCacheServices';

import EnlargeableImage from '../../components/enlargeableImage/EnlargeableImage';

import {formatTokenTime, maskPhoneNumber} from '../../utils/globalUtil';

const statusOptions = [
  {label: 'Waiting', value: 'Waiting'},
  {label: 'In Progress', value: 'In Progress'},
  {label: 'Completed', value: 'Completed'},
  {label: 'Cancelled', value: 'Cancelled'},

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
    doctorId,
  }) => {
    const [hindiName, setHindiName] = useState('');
    const [status, _] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const memoizedTranslate = useCallback(name => {return translateNameToHindi(name) || null; },[translateNameToHindi]);
    console.log('fee status : ' , token.fee_status);

    useEffect(() => {
      const fetchPatientImage = async () => {
        if (token.patient_id) {
          const patientImageUrl = await GetPatientImage(
            doctorId,
            token.patient_id,
          );
          if (patientImageUrl) {
            setImageUrl(patientImageUrl);
          } else {
            setImageUrl(null);
          }
        }
      };
      if (token.patient_name && !hindiName) {
        memoizedTranslate(token.patient_name)
          .then(setHindiName)
          .catch(() => setHindiName(''));
      }
      fetchPatientImage();
    }, [
      token.patient_name,
      hindiName,
      memoizedTranslate,
      token.patient_id,
      doctorId,
    ]);

    const handleStatusChange = async item => {
      const updateTokenDataObj = {
        ...token,
        status: item.value,
      };
      await updateToken(updateTokenDataObj);
    };

    return (
      <>
        <TouchableOpacity
          style={[
            styles.tokenCard,
            token.status === 'In Progress' && styles.inProgressCard,
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
              {imageUrl ? (
                <EnlargeableImage
                  imageUrl={imageUrl}
                  imageStyle={styles.profileImage}
                />
              ) : null}
              <Text>{token.patient_name}</Text>
              <Text> {token.age && `(${token.age})`} </Text>
              {/* <Text>{hindiName || ''}</Text> */}
            </View>
            <View style={styles.tokenNumber}>
              <Text>{formatTokenTime(token.created_date)}</Text>
              <View style={styles.tokenNumberText}>
                <Text>{token.token_no}</Text>
              </View>
            </View>
          </View>

          <View style={styles.tokenDetails}>
            <Text style={styles.detailText}>
              {maskPhoneNumber(token.mobile_number)}
            </Text>

            {/* Payment Switch */}
            <View
              style={styles.paymentSwitchContainer}
           >
                <Text  style={styles.paymentText}>Fee : </Text>
              <Text
                style={
                  styles.paymentStatus && token.fee_status === 'Paid'
                    ? styles.paidStatusTextColor
                    : styles.notPaidStatusTextColor
                }>
                {token.fee_status === 'Paid' ? 'Paid' : 'UnPaid'}
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
