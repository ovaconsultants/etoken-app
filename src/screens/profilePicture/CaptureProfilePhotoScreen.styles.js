// CaptureProfilePhotoScreen.styles.js
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('3%'),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerContainer: {
    width: wp('90%'),
    height: hp('45%'),
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    padding: wp('3%'),
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('6%'),
    borderRadius: 10,
    marginBottom: hp('3%'),
    width: wp('90%'),
  },
  uploadButtonText: {
    color: 'white',
    fontSize: wp('4.5%'),
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
    marginTop: hp('2%'),
  },
  navButton: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('6%'),
    borderRadius: 10,
    width: wp('42%'),
  },
  nextButton: {
    backgroundColor: '#007AFF',
  },
  skipButton: {
    backgroundColor: '#E0E0E0',
  },
  navButtonText: {
    fontSize: wp('4.2%'),
    fontWeight: '600',
    textAlign: 'center',
  },
  nextButtonText: {
    color: 'white',
  },
  skipButtonText: {
    color: '#333',
  },
  loadingIndicator: {
    marginTop: hp('2%'),
  },
});

export default styles;