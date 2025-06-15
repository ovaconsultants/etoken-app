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
      fontSize: fontSize(isTablet ? 16 : 14),
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 4,
    },
    time: {
      fontSize: fontSize(isTablet ? 14 : 12),
      color: '#000',
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
      color: '#000',
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
      width: isTablet ? 220 : 150,
    },
    dropdown: {
      height: isTablet ? 58 : 35,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
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
      paddingVertical: 20,
      paddingHorizontal: 12,
    },
    dropdownItemText: {
      fontSize: fontSize(isTablet ? 14 : 12),
      color: '#000',
    },
  });
};