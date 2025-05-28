import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { showToast } from '../../../components/toastMessage/ToastMessage';
import { Camera } from 'lucide-react-native';

const CapturePatientProfilePhotoScreen = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openCameraAndCrop = async () => {
    try {
      if (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        Platform.isTesting
      ) {
        showToast('Camera not available in simulator', { type: 'error' });
        return;
      }

      const image = await ImagePicker.openCamera({
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
      onImageSelected(imageData);
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        showToast(
          error.message === 'Cannot run camera on simulator'
            ? 'Camera not available in simulator'
            : 'Error capturing image',
          { type: 'error' }
        );
      }
    }
  };

  const resetPhoto = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {!selectedImage ? (
        <View style={styles.cameraButtonContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={openCameraAndCrop}>
            <Camera color="white" size={30} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.confirmButton} onPress={() => onImageSelected(selectedImage)}>
              <Camera color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.retakeButton} onPress={resetPhoto}>
              <Camera color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cameraButton: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  previewContainer: {
    alignItems: 'center',
  },
  previewImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  confirmButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 50,
  },
  retakeButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 50,
  },
});

export default CapturePatientProfilePhotoScreen;
