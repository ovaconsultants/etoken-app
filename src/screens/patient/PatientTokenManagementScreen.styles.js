import { StyleSheet } from 'react-native';
import { fontSize } from '../../utils/fontUtils';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

export const createStyles = isLandscape =>
  StyleSheet.create({
    fullScreenContainer: {
      flex: 1,
      backgroundColor: '#fff',
      width: '100%',
      height: '100%',
      gap: isLandscape ? 12 : 8,
    },
    // Buttons
    actionButtonsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      gap: 12,
    },
    primaryButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      backgroundColor: '#007BFF',
      borderRadius: 10,
      paddingVertical: isTablet ? 16 : 14, // Increased button height
    },
    secondaryButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      paddingVertical: isTablet ? 16 : 14,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: fontSize(isTablet ? 18 : 18),
      paddingVertical: isTablet ? 28 : 12,
    },
    secondaryButtonText: {
      color: '#333',
      fontWeight: 'bold',
      fontSize: fontSize(isTablet ? 18 : 16),
    },

    tokenListContainer: {
      flex: 1,
      paddingHorizontal: 8,
    },

    tokenCard: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: isLandscape ? 10 : 16,
      borderWidth: 1,
      borderColor: '#1976d2',
      marginBottom: 8,
    },
    tokenCardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    profileImageContainer: {
      height: isTablet ? 60 : 50,
      width: isTablet ? 60 : 50,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    profileImage: {
      width: isTablet ? 56 : 46,
      height: isTablet ? 56 : 46,
      borderRadius: isTablet ? 28 : 23,
    },

    tokenDataContent: {
      flex: 1,
      gap: 8,
    },

    tokenHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    patientName: {
      fontSize: fontSize(isTablet ? 16 : 14),
      fontWeight: 'bold',
      color: '#000',
    },
    tokenNumber: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tokenNumberText: {
      marginLeft: 8,
      fontSize: fontSize(isTablet ? 14 : 12),
      fontWeight: 'bold',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: 'green',
      backgroundColor: '#f0fdf0',
      color: 'green',
    },
     tokenNumberValue: {
      fontSize: fontSize(isTablet ? 14 : 12),
      color: 'green',
      fontWeight: 'bold',
    },
     tokenTimeText: {
      fontSize: fontSize(isTablet ? 14 : 12),
      color: '#000',
      fontWeight: '500',
    },
    tokenDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    phoneNumber: {
      fontSize: fontSize(isTablet ? 14 : 12),
      color: '#444',
    },
    paidStatusTextColor: {
      fontSize: fontSize(isTablet ? 12 : 12),
      fontWeight: 'bold',
      color: '#4CAF50',
    },
    notPaidStatusTextColor: {
      fontSize: fontSize(isTablet ? 12 : 12),
      fontWeight: 'bold',
      color: '#F44336',
    },

    feePhoneStatusContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    statusDropdownContainer: {
      width: isTablet ? 330 : 300,
      alignItems: 'flex-end',
    },
    dropdown: {
      width: '100%',
      height: 42,
    },
    dropdownContainer: {
      maxHeight: 150,
      borderRadius: 10,
    },
    itemContainer: {
  height: 45,
  justifyContent: 'center',
  paddingHorizontal: 12,

},
    selectedStatusText: {
      textAlign: 'right',
      fontSize: fontSize(isTablet ? 14 : 12),
      fontWeight: 'bold',
      color: '#000',
    },
    placeholderText: {
      fontSize: fontSize(isTablet ? 14 : 12),
      textAlign: 'center',
      marginRight: 8,

    },
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      color: '#000',
    },
    smallDropdownItemText: {
      fontSize: fontSize(isTablet ? 14 : 12),
    },
    smallStatusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 4,
    },
    greenDot: { backgroundColor: '#4CAF50' },
    redDot: { backgroundColor: '#F44336' },
    yellowDot: { backgroundColor: '#FFC107' },
    blueDot: { backgroundColor: '#2196F3' },

    // Variants
    inProgressCard: { backgroundColor: '#f3faf5' },
    completedCard: { backgroundColor: '#e8f5e9' },
    cancelledCard: { backgroundColor: '#fce4ec' },
    waitingCard: { backgroundColor: '#f1f1f1' },
    selectedCard: { opacity: 0.9, backgroundColor: '#e3f2fd' },
  });
