import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {showToast} from '../../../components/toastMessage/ToastMessage';
import {useOrientation} from '../../../hooks/useOrientation';

const CapturePatientProfilePhotoScreen = ({onImageSelected, onCancel}) => {
  const {isLandscape, dimensions} = useOrientation();
  const styles = createStyles(isLandscape, dimensions);

  const [selectedImage, setSelectedImage] = useState(null);

  const selectAndCropImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      const imageData = {
        uri: image.path,
        type: image.mime,
        width: image.width,
        height: image.height,
      };

      setSelectedImage(imageData);
      onImageSelected(imageData); // Immediately send back to parent
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        showToast('Error selecting image', {type: 'error'});
      }
    }
  };

  const openCameraForImage = async () => {
    try {
      if (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        Platform.isTesting
      ) {
        showToast('Camera not available in simulator', {type: 'error'});
        return;
      }
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      const imageData = {
        uri: image.path,
        type: image.mime,
        width: image.width,
        height: image.height,
      };

      setSelectedImage(imageData);
      onImageSelected(imageData); // Immediately send back to parent
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        showToast(
          error.message === 'Cannot run camera on simulator'
            ? 'Camera not available in simulator'
            : 'Error capturing image',
          {type: 'error'},
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {selectedImage ? (
          <View style={styles.previewContainer}>
            <Image
              source={{uri: selectedImage.uri}}
              style={styles.previewImage}
              resizeMode="cover"
            />
            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => onImageSelected(selectedImage)}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => setSelectedImage(null)}>
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={selectAndCropImage}>
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={openCameraForImage}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const createStyles = (isLandscape, dimensions) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      width: '100%',
      padding: 20,
    },
    previewContainer: {
      alignItems: 'center',
    },
    previewImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 20,
    },
    buttonGroup: {
      width: '100%',
    },
    selectButton: {
      backgroundColor: '#3498db',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      alignItems: 'center',
    },
    cameraButton: {
      backgroundColor: '#2ecc71',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: '#e74c3c',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    confirmButton: {
      backgroundColor: '#2ecc71',
      padding: 15,
      borderRadius: 8,
      marginRight: 10,
    },
    retakeButton: {
      backgroundColor: '#e74c3c',
      padding: 15,
      borderRadius: 8,
    },
    confirmationButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default CapturePatientProfilePhotoScreen;
