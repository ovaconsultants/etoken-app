import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  screenTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerBadges: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: wp('5%'),
  },
  badge: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: 20,
  },
  greenBadge: {
    backgroundColor: '#e6f7e6',
  },
  yellowBadge: {
    backgroundColor: '#fff8e6',
  },
  redBadge: {
    backgroundColor: '#ffebee',
  },
  badgeText: {
    fontSize: wp('3%'),
  },

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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },

  // Token List
  tokenListContainer: {
    flex: 1,
    paddingHorizontal: wp('4%'),
  },
  tokenCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp('4%'),
    marginBottom: hp('1%'),
    borderWidth: 1,
    borderColor: '#eee',
  },
  inProgressCard: {
    backgroundColor: '#f3faf5',
    borderColor: '#2e7d32',
  },
  onHoldCard: {
    backgroundColor: '#fff5f5',
    borderColor: '#d32f2f',
  },
  selectedCard: {
    opacity: 0.9,
    backgroundColor : '#f1f1f1',
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  patientName: {
    flexDirection : 'row',
    // justifyContent : 'space-between',
    alignItems: 'center',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  tokenNumber: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  tokenDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    color: '#666',
  },
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
  greenDot: {
    backgroundColor: '#4CAF50',
  },
  redDot: {
    backgroundColor: '#F44336',
  },
  yellowDot: {
    backgroundColor: '#FFC107',
  },
  statusText: {
    fontSize: wp('3.5%'),
  },
  paymentStatus: {
    fontSize: wp('3.5%'),
  },

  // Footer Navigation
  footerNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: wp('3%'),
    marginTop: hp('0.5%'),
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
// Add these to your stylesheet
dropdownMenu: {
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  zIndex: 100,
  minWidth: 120,
},
dropdownMenuItem: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  flexDirection: 'row',
  alignItems: 'center',
},
dropdownMenuItemText: {
  fontSize: 14,
  color: '#333',
},
// statusContainer: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   position: 'relative', // Add this for positioning dropdown
// },
paymentStatusContainer: {
  position: 'relative', // Add this for positioning dropdown
},
});
