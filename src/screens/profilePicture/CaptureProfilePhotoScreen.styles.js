// CaptureProfilePhotoScreen.styles.js
import { StyleSheet } from 'react-native';

const createStyles = (isLandscape, dimensions) => {
  const { width} = dimensions;
  const scaleFont = (size) => {
    const scaleFactor = width / 375; 
    return size * Math.min(scaleFactor, 1.8);
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
      backgroundColor: '#f5f5f5',
      paddingHorizontal: 20,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imagePickerContainer: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 0,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    uploadButton: {
      backgroundColor: '#007AFF',
      borderRadius: 10,
      width: '100%',
      height: isLandscape ?  40  :  50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: isLandscape ? 5 : 10 ,
    },
    uploadButtonText: {
      color: 'white',
      fontSize: scaleFont(16),
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
      borderRadius: 10,
      width: '100%',
      height: isLandscape ?  40  :  50,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: isLandscape ? 5 : 0 ,
    },
    skipButtonText: {
      color: 'white',
      fontSize: scaleFont(15),
      fontWeight: '600',
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    loadingIndicator: {
      marginVertical: 15,
    },
    croppedImage: {
  width: 200,
  height: 200,
  borderRadius: 100,
  alignSelf: 'center',
  marginBottom: 20,
},
placeholderContainer: {
  width: 200,
  height: 200,
  borderRadius: 100,
  backgroundColor: '#f0f0f0',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginBottom: 20,
},
placeholderText: {
  color: '#888',
  fontSize: 16,
},
buttonGroup: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  marginBottom: 20,
},
selectButton: {
  backgroundColor: '#4CAF50',
  padding: 12,
  borderRadius: 8,
  minWidth: '45%',
},
cameraButton: {
  backgroundColor: '#2196F3',
  padding: 12,
  borderRadius: 8,
  minWidth: '45%',
},
buttonText: {
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
},
  });
};

export default createStyles;