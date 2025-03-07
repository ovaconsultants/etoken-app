import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', //F8F9FA
  },

  cardContainer: {
    height: hp('60%'),
    justifyContent: 'center',
    alignItems: 'center',
    margin:wp('1%'),
    padding: wp('5%'), // 5% of screen width// 12% of screen height
  },
  card: {
    width: wp('90%'), // 90% of screen width
    height: hp('60%'), // 60% of screen height
    backgroundColor: 'white',
    borderRadius: 20,
    padding: wp('1%'), // 5% of screen width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: wp('5%'), // 5% of screen width
    color: '#333',
    textAlign: 'center',
  },
  button: {
    marginTop : hp('3%'),
    alignSelf : 'center',
    width : wp('70%'),
    height : hp('5%'),
    backgroundColor: '#007AFF', // 2% of screen height
    borderRadius: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: wp('10%'),
    fontWeight: '600',
  },
  
});