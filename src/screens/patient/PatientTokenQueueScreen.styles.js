import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: '#F5F5F5',
  },

  // Loading and Empty States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: wp('5%'),
    color: '#666',
  },

  // Button Container
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },

  // Buttons
  recallButton: {
    backgroundColor: '#FF6B6B',
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    width: wp('45%'),
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    width: wp('45%'),
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    width: wp('45%'),
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },

  // ScrollView Content
  scrollContent: {
    paddingBottom: hp('2%'),
  },

  // Table Header
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    padding: hp('1%'),
    borderTopLeftRadius: wp('2%'),
    borderTopRightRadius: wp('2%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  tableHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    fontSize: wp('4%'),
  },

  // Table Rows
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tableCell: {
    textAlign: 'center',
    color: '#333',
    fontSize: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Radio Circle
  radioCircle: {
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: '#007BFF',
    alignSelf: 'center',
  },
  radioCircleSelected: {
    backgroundColor: '#007BFF',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: hp('2%'),
    marginTop: hp('2%'),
  },
  footerButton: {
    backgroundColor: '#6C757D',
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    width: wp('20%'),
    height: hp('8%'),
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  footerButtonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
  },

  // Disabled Button
  disabledButton: {
    opacity: 0.5,
  },

  // Strikethrough
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});