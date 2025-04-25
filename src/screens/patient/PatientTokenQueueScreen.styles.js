import {StyleSheet} from 'react-native';

export const createStyles = (isLandscape) => StyleSheet.create({
  // Main Containers
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    width: '100%',
    height: '100%',
  },

  loadingContainer: {
    flex: isLandscape ? 0.8 : 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  headerContainer: {
    flex: isLandscape ? 0.1 : 0.12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  headerBadges: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 16,
  },

  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
  },

  actionButtonsContainer: {
    flex: isLandscape ? 0.12 : 0.1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },

  tokenListContainer: {
    flex: isLandscape ? 5 : 12,  // Significantly increased height
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#f5f7fa',
  },

  footerContainer: {
    flex: isLandscape ? 0.08 : 0.07,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Badge Styles
  badge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    elevation: 1,
  },
  greenBadge: {backgroundColor: '#d1fae5'},
  yellowBadge: {backgroundColor: '#fef3c7'},
  redBadge: {backgroundColor: '#fee2e2'},
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Button Styles
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 2,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },

  // Token Card Styles
  tokenCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
     borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inProgressCard: {
    backgroundColor: '#f0fdf4',
    borderColor: '#86efac',
  },
  onHoldCard: {
    backgroundColor: '#fff1f2',
    borderColor: '#fda4af',
  },
  completedCard: {
    backgroundColor: '#f0fdf4',
    borderColor: '#86efac',
  },
  cancelledCard: {
    backgroundColor: '#fff1f2',
    borderColor: '#fda4af',
  },
  waitingCard: {
    backgroundColor: '#eff6ff',
    borderColor: '#93c5fd',
  },
  selectedCard: {
    opacity: 0.9,
    backgroundColor: '#f3f4f6',
    borderColor: '#9ca3af',
  },

  // Token Content
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  tokenNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e40af',
  },
  tokenNumberText: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#1e40af',
  },
  tokenDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  detailText: {
    color: '#6b7280',
    fontSize: 14,
  },

  // Status Indicators
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  greenDot: {backgroundColor: '#10b981'},
  redDot: {backgroundColor: '#ef4444'},
  yellowDot: {backgroundColor: '#f59e0b'},
  blueDot: {backgroundColor: '#3b82f6'},
  orangeDot: {backgroundColor: '#f97316'},
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Dropdown Styles
  statusDropdownContainer: {
    width: 120,
    alignItems: 'flex-start',
  },
  dropdown: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  selectedStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  smallStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  smallStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dropdownItem: {
    padding: 6,
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
    gap: 8,
  },
  smallSwitch: {transform: [{scaleX: 0.6}, {scaleY: 0.6}]},
  paymentStatus: {fontSize: 14, width: 60, alignItems: 'center'},

  // Footer Navigation
  footerNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  footerButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  footerButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b5563',
    marginTop: 4,
  },
});