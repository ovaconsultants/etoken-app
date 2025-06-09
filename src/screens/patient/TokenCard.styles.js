import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { fontSize } from '../../utils/fontUtils';

export const createTokenCardStyles = (isLandscape) => {
  const isTablet = DeviceInfo.isTablet();

  return StyleSheet.create({
    card: {
      backgroundColor: '#f5fbff',
      borderRadius: 10,
      padding:  isTablet ? 12 : 6,
      marginBottom : 70,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#1976d2',
    },
    selectedCard: {
      borderColor: '#007BFF',
      backgroundColor: '#e6f2ff',
    },
    cardContent: {
      flexDirection: 'row',
    },
    imageWrapper: {
      width: isTablet ? 100 : 70,
      height: isTablet ? 100 : 70,
      borderRadius: isTablet ? 50 : 50,
      overflow: 'hidden',
      marginRight: 12,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    contentWrapper: {
      flex: 1,
      justifyContent: 'space-between',
    },
    topContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    nameTimeBlock: {
      flex: 1,
    },
    name: {
      fontSize: fontSize(isTablet ? 18 : 16),
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 4,
    },
    time: {
      fontSize: fontSize(isTablet ? 16 : 14),
      color: '#000',
      fontWeight: '500',
    },
    tokenNumberText: {
      fontSize: fontSize(isTablet ? 22 : 18),
      color: 'green',
      fontWeight: 'bold',
    },
    bottomContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    phoneAndFeeBlock: {
      flex: 1,
    },
    phone: {
      fontSize: fontSize(isTablet ? 14 : 12),
      color: '#444',
      marginBottom: 4,
    },
    feePaid: {
      fontSize: fontSize(isTablet ? 14 : 12),
      fontWeight: 'bold',
      color: '#4CAF50',
    },
    feeUnpaid: {
      fontSize: fontSize(isTablet ? 14 : 12),
      fontWeight: 'bold',
      color: '#F44336',
    },
    dropdownWrapper: {
      width: isTablet ? 240 : 120,
    },
    dropdown: {
      height: 38,
      // borderColor: '#ccc',
      // borderWidth: 1,
      // borderRadius: 6,
      paddingHorizontal: 10,
    },
    dropdownText: {
      fontSize: fontSize(isTablet ? 14 : 12),
      color: '#000',
    },
    dropdownContainer: {
      borderRadius: 10,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      elevation: 10,
    },
    dropdownItemContainer: {
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    dropdownItemText: {
      fontSize: fontSize(isTablet ? 14 : 12),
      color: '#000',
    },
  });
};