import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: wp('5%'),
    margin : wp('5%')
  },
  cardContainer: {
    height: hp('45%'),
    marginBottom: hp('3%'),
  },
  selectionContainer: {
    marginBottom: hp('5%'),
  },
  selectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    width: wp('40%'),
    padding: wp('3%'),
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F7FF',
  },
  optionContent: {
    alignItems: 'center',
  },
  optionText: {
    fontSize: wp('4%'),
    fontWeight: '500',
    color: '#333',
    marginTop: hp('1%'),
    marginBottom: hp('0.5%'),
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: wp('3.2%'),
    color: '#666',
    textAlign: 'center',
  },
  button: {
    marginTop: hp('2%'),
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