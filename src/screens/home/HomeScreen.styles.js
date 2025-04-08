import { StyleSheet , Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('window');
const isLandscape = width > height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 246)',
  },
  cardContainer: {
    flex: 3,
    height: isLandscape ? hp('30%') : hp('45%'),
    marginBottom: hp('3%'),
  },
  selectionContainer: {
    flex : 1,
    flexDirection : 'row',
    marginBottom: hp('4%'),

  },
  buttonContainer: {
    flex: 1,

  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex : 2 ,
    marginHorizontal : wp('1%'),
    padding: wp('3%'),
    justifyContent: 'center',
    borderRadius: wp('3%'),
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
    flex: 1,
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  optionText: {
    fontSize: wp('4%'),
    fontWeight: '500',
    color: '#333',
    marginTop: hp('1%'),
    marginHorizontal : wp('2%'),
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
    flex : 0.5 ,
    marginVertical: hp('2%'),
    marginHorizontal : wp('1%'),
    backgroundColor: '#007AFF',
    borderRadius: wp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: hp('0.5%') },
    shadowOpacity: 0.3,
    shadowRadius: wp('1.5%'),
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