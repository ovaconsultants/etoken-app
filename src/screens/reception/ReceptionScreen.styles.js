import {StyleSheet} from 'react-native';
export const createStyles = isLandscape =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      padding: '2%',
      flex: 1,
      gap: isLandscape ? 0 : '4%',
    },
    contentContainer: {
      flex: 1,
      gap: isLandscape ? '5%' : '4%',
    },
    searchBarContainer: {
      marginVertical: isLandscape ? 0 : 15,
    },
    formContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },

    inputContainer: {
      marginBottom: isLandscape ? 7 : 15,
    },
    input: {
      height: isLandscape ? 30 : 50,
      paddingLeft: '2%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      fontSize: 16,
      backgroundColor: '#fff',
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 5,
    },
    buttonContainer: {
      flex: 0.6,
      justifyContent: 'center',
      marginTop: isLandscape ? 0 : 5,
    },

    uploadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    profileUploadLink: {
      flex: 0.1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },

    submitButton: {
      backgroundColor: '#007AFF',
      paddingHorizontal: 15,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    disabledButton: {
      backgroundColor: 'rgba(0, 122, 255, 0.6)',
    },

    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 24,
    },
    footerContainer: {
      flex: isLandscape ? 0.2 : 0.1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    imagePreviewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileImagePreview: {
      width: 50,
      height: 50,
      borderRadius: 30,
    },
    changePhotoButton: {
      marginTop: 10,
      padding: 8,
    },
    changePhotoText: {
      color: '#3498db',
      fontWeight: 'bold',
    },
  });
