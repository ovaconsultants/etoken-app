// InProgressTokenNotificationScreen.styles.js
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'space-evenly',
  },
  card: {
    width: wp('40%'),
    borderRadius: wp('3%'), // Responsive border radius
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // Responsive padding
    marginBottom: hp('2%'),
    backgroundColor : 'rgba(217, 223, 249, 0.9)'
  },
  tableCell: {
    fontSize: wp('5%'),
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  noTokenText: {
    fontSize: wp('5%'), // Responsive font size
    textAlign: 'center',
    marginBottom: hp('2%'), // Responsive margin bottom
    color: '#555',
  },
});