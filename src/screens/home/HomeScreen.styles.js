import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  cardContainer: {
    height: hp('60%'),
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp('1%'),
    padding: wp('5%'),
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  button: {
    marginTop: hp('3%'),
    alignSelf: 'center',
    width: wp('70%'),
    height: hp('6%'),
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
});