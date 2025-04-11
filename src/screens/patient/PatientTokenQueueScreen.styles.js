import {StyleSheet} from 'react-native';

export const createStyles = (isLandscape) => StyleSheet.create({
  // Main Containers
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    gap: isLandscape ? '4%' : '3%',
  },

  loadingContainer: {
    flex: isLandscape ? 1.2 : 1, // Increased in landscape
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal : '1%',
  },

  actionButtonsContainer: {
    flex: isLandscape ? 0.2 : 0.1,
    flexDirection: 'row',
    paddingHorizontal : '1%',
    gap: ('4%'),
  },

  tokenListContainer: {
    flex: isLandscape ? 0.7 : 3,
    paddingHorizontal : '1%',
  },

  footerContainer: {
    flex: isLandscape ? 0.2 : 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal : '1%',
  },

  headerContainer: {
    flex: isLandscape ? 0.15 : 0.1, 
    paddingHorizontal : '1%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  headerBadges: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: ('5%'),
  },
  screenTitle: {
    fontSize: (5 + '%'),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },

  // Badge Styles
  badge: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: ('2%'),
    paddingVertical: ('0.5%'),
    borderRadius: 20,
  },
  greenBadge: {backgroundColor: '#e6f7e6'},
  yellowBadge: {backgroundColor: '#fff8e6'},
  redBadge: {backgroundColor: '#ffebee'},
  badgeText: {fontSize: (3 + '%')},

  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: ('2%'),
    backgroundColor: '#007BFF',
    borderRadius: 10,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: ('2%'),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
  secondaryButtonText: {color: '#333', fontWeight: 'bold'},

  // Token Card Styles
  tokenCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: ('4%'),
    paddingVertical :  isLandscape ? ('1%') : ('4%'),
    borderWidth: 1,
    borderColor: '#eee',
  },
  inProgressCard: {backgroundColor: '#f3faf5', borderColor: '#2e7d32'},
  onHoldCard: {backgroundColor: '#fff5f5', borderColor: '#d32f2f'},
  completedCard: {backgroundColor: '#e8f5e9', borderColor: '#388e3c'},
  cancelledCard: {backgroundColor: '#fce4ec', borderColor: '#d32f2f'},
  waitingCard: {backgroundColor: '#e3f2fd', borderColor: '#1976d2'},
  selectedCard: {opacity: 0.9, backgroundColor: '#f1f1f1'},

  // Token Content
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ('1%'),
  },
  patientName: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: (4 + '%'),
    fontWeight: 'bold',
  },
  tokenNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: (5 + '%'),
    fontWeight: 'bold',
  },
  tokenNumberText: {
    marginLeft: '5%',
    fontSize: (5 + '%'),
    fontWeight: 'bold',
  },
  tokenDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {color: '#666'},

  // Status Indicators
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ('1%'),
  },
  statusDot: {
    width: ('2%'),
    height: ('2%'),
    borderRadius: ('1%'),
  },
  greenDot: {backgroundColor: '#4CAF50'},
  redDot: {backgroundColor: '#F44336'},
  yellowDot: {backgroundColor: '#FFC107'},
  blueDot: {backgroundColor: '#2196F3'},
  orangeDot: {backgroundColor: '#FF9800'},
  statusText: {fontSize: (3.5 + '%')},

  // Dropdown Styles
  statusDropdownContainer: {width: 110, alignItems: 'flex-start'},
  dropdown: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  selectedStatusText: {
    fontSize: (3.5 + '%'),
    fontWeight: 'bold',
    color: '#333',
  },
  placeholderText: {
    flex: 1,
    textAlign: 'right',
  },
  smallStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  smallStatusText: {fontSize: 12, marginLeft: 4},
  smallDropdownItemText: {fontSize: 12},
  dropdownItem: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  selectedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },

  // Payment Controls
  paymentSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  smallSwitch: {transform: [{scaleX: 0.6}, {scaleY: 0.6}]},
  paymentStatus: {fontSize: 14, width: 60, alignItems: 'center'},

  // Footer Navigation
  footerNavigation: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  footerButton: {alignItems: 'center'},
  footerButtonText: {fontSize: (3 + '%'), marginTop: ('0.5%')},
});
