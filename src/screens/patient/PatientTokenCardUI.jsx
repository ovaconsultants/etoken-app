import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { GetPatientImage } from '../../services/patientImagesCacheServices';
import EnlargeableImage from '../../components/enlargeableImage/EnlargeableImage';
import { formatTokenTime, maskPhoneNumber } from '../../utils/globalUtil';
import { useOrientation } from '../../hooks/useOrientation';
import { createTokenCardStyles } from './TokenCard.styles';

const statusOptions = [
  { label: 'Waiting', value: 'Waiting' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Cancelled', value: 'Cancelled' },
];

export const TokenCard = React.memo(
  ({ token, isSelected, onPress, onLongPress, updateToken, doctorId }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const { isLandscape } = useOrientation();
    const styles = createTokenCardStyles(isLandscape);

    useEffect(() => {
      const fetchImage = async () => {
        if (token.patient_id) {
          const url = await GetPatientImage(doctorId, token.patient_id);
          setImageUrl(url || null);
        }
      };
      fetchImage();
    }, [token.patient_id, doctorId]);

    const handleStatusChange = async (item) => {
      await updateToken({ ...token, status: item.value });
    };

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={500}
      >
        <View style={styles.cardContent}>
          <View style={styles.imageWrapper}>
            {imageUrl && (
              <EnlargeableImage imageUrl={imageUrl} imageStyle={styles.image} />
            )}
          </View>

          <View style={styles.contentWrapper}>
            <View style={styles.topContent}>
              <View style={[styles.nameTimeBlock, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'left' }]}>
                <Text style={styles.name}>{token.patient_name} ({token.age})</Text>
                <Text style={styles.time}>{formatTokenTime(token.created_date)}</Text>
                <Text style={styles.tokenNumberText}>{token.token_no}</Text>
              </View>
            </View>

            <View style={[styles.bottomContent, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
              <Text style={styles.phone}>{token.mobile_number}</Text>
              {/* <Text
                style={
                  token.fee_status === 'Paid'
                    ? styles.feePaid
                    : styles.feeUnpaid
                }
              >
                {token.fee_status === 'Paid' ? 'Paid' : 'Not Paid'}
              </Text> */}
              <View style={styles.dropdownWrapper}>
                <Dropdown
                  value={token.status}
                  data={statusOptions}
                  labelField="label"
                  valueField="value"
                  onChange={handleStatusChange}
                  style={styles.dropdown}
                  selectedTextStyle={styles.dropdownText}
                  containerStyle={styles.dropdownContainer}
                  itemContainerStyle={styles.dropdownItemContainer}
                  renderItem={(item) => (
                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                  )}
                />
              </View>
            </View>

          </View>
        </View>
      </TouchableOpacity>
    );
  }
);
