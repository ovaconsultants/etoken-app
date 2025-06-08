import { StyleSheet } from 'react-native';
import { fontSize } from '../../utils/fontUtils';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

export const createStyles = (isLandscape, dimensions) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      padding: isTablet ? '2%' : '2%',
      flexDirection: 'column',
      gap: isLandscape ? 16 : 12,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
    },
    searchBarContainer: {
      // marginBottom: isLandscape ? 10 : 20,
    },
    formContainer: {
      width: '100%',
    },
    inputsWrapper: {
      marginTop: 10,
    },
    inputContainer: {
      marginBottom: isTablet ? 14 : 10,
    },
    input: {
      height: isTablet ? 72 : 48,
      paddingHorizontal: isTablet ? 16 : 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      fontSize: fontSize(14),
      backgroundColor: '#fff',
      marginRight: isLandscape ? 10 : 0,
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: fontSize(12),
      marginTop: 4,
    },
    profileUploadLink: {
      alignItems: 'center',
      // marginVertical: isTablet ? 20 : 14,
     minHeight: isTablet ? 120 : 80,
    },
    imagePreviewContainer: {
      alignItems: 'center',
    },
    profileImagePreview: {
      width: isTablet ? 90 : 70,
      height: isTablet ? 90 : 70,
      borderRadius: isTablet ? 45 : 35,
    },
    changePhotoButton: {
      marginTop: 10,
      paddingVertical: 6,
      paddingHorizontal: 14,
      backgroundColor: '#f0f0f0',
      borderRadius: 6,
    },
    changePhotoText: {
      color: '#007AFF',
      fontSize: fontSize(14),
      fontWeight: 'bold',
    },
    buttonContainer: {
      marginTop: isLandscape ? 10 : 20,
    },
    submitButton: {
      backgroundColor: '#007AFF',
      paddingVertical: isTablet ? 18 : 14,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: fontSize(isTablet ? 22 : 18),
    },
  });
