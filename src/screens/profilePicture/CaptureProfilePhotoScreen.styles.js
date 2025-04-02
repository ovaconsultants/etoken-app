// CaptureProfilePhotoScreen.styles.js
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin : wp('5%'),
    backgroundColor: '#f5f5f5',
    paddingHorizontal: wp('5%'),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagePickerContainer: {
    width: '100%',
    height: hp('30%'),
    backgroundColor: '#fff',
    borderRadius: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('4%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    paddingVertical : hp('2%'),
    paddingHorizontal : wp('2%'),
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: hp('1%'),
    borderRadius: 10,
    width: '100%',
    height : hp('5%'),
    marginTop: hp('2%'),
  },
  uploadButtonText: {
    color: 'white',
    fontSize: wp('4.5%'),
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  navigationButtonsContainer: {
    width: '100%',
  },
  skipButton: {

    backgroundColor: '#007AFF',
    paddingVertical: hp('1%'),
    borderRadius: 10,
    width: '100%',
    height : hp('5%'),
    marginBottom: hp('2%'),
  },
  skipButtonText: {
    color: 'white',
    fontSize: wp('4.2%'),
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  loadingIndicator: {
    marginVertical: hp('2%'),
  },
});

export default styles;