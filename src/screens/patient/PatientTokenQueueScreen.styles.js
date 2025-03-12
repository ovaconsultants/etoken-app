import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  recallButton: {
    backgroundColor: '#FF6B6B',
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    width: wp('28%'),
    alignItems: 'center',
    elevation: 3,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    width: wp('28%'),
    alignItems: 'center',
    elevation: 3,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    width: wp('28%'),
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: hp('2%'),
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems :'center',
    justifyContent:'center',
    backgroundColor: '#007BFF',
    padding: hp('1%'),
    borderTopLeftRadius: wp('2%'),
    borderTopRightRadius: wp('2%'),
  },
  tableHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    fontSize: wp('4%'),
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tableCell: {
    textAlign: 'center',
    color: '#333',
    fontSize: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin : hp('2%'),
    marginTop: hp('2%'),
  },
  footerButton: {
    backgroundColor: '#6C757D',
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    width: wp('20%'),
    height : hp('8%'),
    alignItems: 'center',
    elevation: 3,
  },
  footerButtonText: {
    alignSelf:'center',
    color: '#FFF',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
  },
  disabledButton :{
    opacity : 0.5 ,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
