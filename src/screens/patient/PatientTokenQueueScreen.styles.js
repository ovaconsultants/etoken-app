import { StyleSheet } from 'react-native';

export const createStyles = (isLandscape) => StyleSheet.create({
  // Main Containers
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    gap: isLandscape ? 12 : 8,
  },

  loadingContainer: {
    flex: isLandscape ? 1.2 : 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
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

  headerContainer: {
    flex: isLandscape ? 0.15 : 0.1, 
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  headerBadges: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 16,
  },

  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },

  // Badge Styles
  badge: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  greenBadge: { backgroundColor: '#e6f7e6' },
  yellowBadge: { backgroundColor: '#fff8e6' },
  redBadge: { backgroundColor: '#ffebee' },
  badgeText: { fontSize: 14 },

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
  buttonText: { color: 'white', fontWeight: 'bold' },
  secondaryButtonText: { color: '#333', fontWeight: 'bold' },

  // Token Card Styles
  tokenCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: isLandscape ? 8 : 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
  },
  inProgressCard: { backgroundColor: '#f3faf5', borderColor: '#2e7d32' },
  onHoldCard: { backgroundColor: '#fff5f5', borderColor: '#d32f2f' },
  completedCard: { backgroundColor: '#e8f5e9', borderColor: '#388e3c' },
  cancelledCard: { backgroundColor: '#fce4ec', borderColor: '#d32f2f' },
  waitingCard: { backgroundColor: '#e3f2fd', borderColor: '#1976d2' },
  selectedCard: { opacity: 0.9, backgroundColor: '#f1f1f1' },

  // Token Content
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  tokenNumberText: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tokenDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: { color: '#666', fontSize: 14 },

  // Status Indicators
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  greenDot: { backgroundColor: '#4CAF50' },
  redDot: { backgroundColor: '#F44336' },
  yellowDot: { backgroundColor: '#FFC107' },
  blueDot: { backgroundColor: '#2196F3' },
  orangeDot: { backgroundColor: '#FF9800' },
  statusText: { fontSize: 14 },

  // Dropdown Styles
  statusDropdownContainer: { width: 120, alignItems: 'flex-start' },
  dropdown: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  selectedStatusText: {
    fontSize: 14,
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
  smallStatusText: { fontSize: 12, marginLeft: 4 },
  smallDropdownItemText: { fontSize: 12 },
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
  smallSwitch: { transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] },
  paymentStatus: { fontSize: 14, width: 60, alignItems: 'center' },

  // Footer Navigation
  footerNavigation: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  footerButton: { alignItems: 'center', padding: 8 },
  footerButtonText: { fontSize: 12, marginTop: 4 },
});