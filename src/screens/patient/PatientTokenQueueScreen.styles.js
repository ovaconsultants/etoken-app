import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// Detect tablet mode
const { width } = Dimensions.get('window');
const isTablet = width >= 600; // Adjust threshold as needed
const tabletFontScale = 1.2; // 20% larger fonts on tablets

// Font scaling function
const scaledFont = (size) => isTablet ? size * tabletFontScale : size;

export const styles = StyleSheet.create({
  // Main Containers
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenListContainer: {
    flex: 1,
    paddingHorizontal: wp('4%'),
  },

  // Header Styles
  headerContainer: {
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerBadges: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: wp('5%'),
  },
  screenTitle: {
    fontSize: wp(scaledFont(5) + '%'),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },

  // Badge Styles
  badge: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: 20,
  },
  greenBadge: { backgroundColor: '#e6f7e6' },
  yellowBadge: { backgroundColor: '#fff8e6' },
  redBadge: { backgroundColor: '#ffebee' },
  badgeText: { fontSize: wp(scaledFont(3) + '%') },

  // Action Buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    gap: wp('4%'),
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp('2%'),
    backgroundColor: '#007BFF',
    padding: hp('2%'),
    borderRadius: 10,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp('2%'),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: hp('2%'),
    borderRadius: 10,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  secondaryButtonText: { color: '#333', fontWeight: 'bold' },

  // Token Card Styles
  tokenCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp('4%'),
    marginBottom: hp('1%'),
    borderWidth: 1,
    borderColor: '#eee',
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
    marginBottom: hp('1%'),
  },
  patientName: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: wp(scaledFont(4) + '%'),
    fontWeight: 'bold',
  },
  tokenNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: wp(scaledFont(5) + '%'),
    fontWeight: 'bold',
  },
  tokenNumberText: { marginLeft: '5%'  , fontSize: wp(scaledFont(5) + '%') , fontWeight: 'bold' },
  tokenDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: { color: '#666' },

  // Status Indicators
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1%'),
  },
  statusDot: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
  },
  greenDot: { backgroundColor: '#4CAF50' },
  redDot: { backgroundColor: '#F44336' },
  yellowDot: { backgroundColor: '#FFC107' },
  blueDot: { backgroundColor: '#2196F3' },
  orangeDot: { backgroundColor: '#FF9800' },
  statusText: { fontSize: wp(scaledFont(3.5) + '%') },

  // Dropdown Styles
  statusDropdownContainer: { width: 110, alignItems: 'flex-start' },
  dropdown: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  selectedStatusText: {
    fontSize: wp(scaledFont(3.5) + '%'),
    fontWeight: 'bold',
    color: '#333',
  },
  placeholderText: {
    flex: 1,
    textAlign : 'right',
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

  smallSwitch: { transform: [{scaleX: 0.6}, {scaleY: 0.6}] },
  paymentStatus: { fontSize: 14 , width : 60, alignItems: 'center' },

  // Footer Navigation
  footerNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  footerButton: { alignItems: 'center' },
  footerButtonText: { fontSize: wp(scaledFont(3) + '%'), marginTop: hp('0.5%') },
});