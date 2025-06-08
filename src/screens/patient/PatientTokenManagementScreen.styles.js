import {StyleSheet} from 'react-native';

export const createStyles = isLandscape =>
  StyleSheet.create({
    // Layout Containers
    fullScreenContainer: {
      flex: 1,
      backgroundColor: '#fff',
      width: '100%',
      height: '100%',
      gap: isLandscape ? 12 : 8,
      position: 'relative',
    },
    headerContainer: {
      flex: isLandscape ? 0.15 : 0.1,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    actionButtonsContainer: {
      flex: isLandscape ? 0.2 : 0.1,
      flexDirection: 'row',
      paddingHorizontal: 8,
      gap: 12,
    },
    tokenListContainer: {
      flex: isLandscape ? 0.7 : 3,
      paddingHorizontal: 8,
    },
    footerContainer: {
      flex: isLandscape ? 0.2 : 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
    },

    // Header Components
    headerBadges: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      gap: 10,
    },
    badge: {
      backgroundColor: '#f1f1f1',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 20,
    },
    badgeText: {fontSize: 14},
    greenBadge: {backgroundColor: '#e6f7e6'},
    yellowBadge: {backgroundColor: '#fff8e6'},

    // Action Buttons
    primaryButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      backgroundColor: '#007BFF',
      borderRadius: 10,
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
    },
    buttonText: {color: 'white', fontWeight: 'bold'},
    secondaryButtonText: {color: '#333', fontWeight: 'bold'},

    // Token Card
    tokenCard: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: isLandscape ? 8 : 16,
      borderWidth: 1,
      borderColor: '#eee',
      marginBottom: 8,
      minHeight: 72, // Add this line for consistent height
      justifyContent: 'center', // Vertically center content
    },
    tokenCardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    profileImageContainer: {
      height: 56, // Fixed height
      width: 56,  // Fixed width for centering
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    profileImage: {
      width: 48,
      height: 48,
      borderRadius: 24,
      resizeMode: 'cover',
    },
    tokenDataContent: {
      flex: 0.85,
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 8,
    },

    // Token Status Variants
    inProgressCard: {backgroundColor: '#f3faf5', borderColor: '#2e7d32'},
    completedCard: {backgroundColor: '#e8f5e9', borderColor: '#388e3c'},
    cancelledCard: {backgroundColor: '#fce4ec', borderColor: '#d32f2f'},
    waitingCard: {backgroundColor: ' #f1f1f1', borderColor: '#1976d2'},
    selectedCard: {opacity: 0.9, backgroundColor: '#e3f2fd'},

    // Token Content
    tokenHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    patientName: {
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    tokenNumber: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tokenNumberText: {
      marginLeft: 12,
      fontWeight: '1000',
      paddingRight: 10,
      paddingLeft: 10,
      borderRadius: 5,
      borderWidth: 0.2,
      borderColor: 'green',
      backgroundColor: 'rgb(253, 255, 254)',
    },
    tokenDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    phoneNumber: {  marginRight : 4    , color: '#666', fontSize: 14},

    // Fee Container
    feePhoneStatusContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    paidStatusTextColor: {color: '#4CAF50'},
    notPaidStatusTextColor: {color: '#F44336'},

    // Status Dropdown
    statusDropdownContainer: {width: 130, alignItems: 'flex-start'},
    dropdown: {
      width: '100%',
      maxHeight: 50,
      justifyContent: 'center',
    },
    dropdownContainer: {
      maxHeight: 150,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemContainer: {
      height: 45,
      borderRadius: 10,
      justifyContent: 'center',
    },
    selectedStatusText: {
      textAlign: 'right',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    placeholderText: {
      flex: 1,
      fontSize: 18,
      textAlign: 'right',
    },
    dropdownItem: {
      padding: 4,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(209, 241, 247, 0.1)',
    },
    smallStatusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 4,
    },
    smallDropdownItemText: {fontSize: 14},
    greenDot: {backgroundColor: '#4CAF50'},
    redDot: {backgroundColor: '#F44336'},
    yellowDot: {backgroundColor: '#FFC107'},
    blueDot: {backgroundColor: '#2196F3'},

    // Overlay
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
  });
