import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {UploadDoctorProfileImageRequest} from '../../../services/profileImageService';
import {showToast} from '../../../components/toastMessage/ToastMessage';
import createStyles from './CaptureDoctorProfilePhotoScreen.styles';
import {globalStyles} from '../../../styles/globalStyles';
import RNFS from 'react-native-fs';
import {useOrientation} from '../../../hooks/useOrientation';

const CaptureDoctorProfilePhotoScreen = ({navigation, route}) => {
  const {isLandscape, dimensions} = useOrientation();
  const styles = createStyles(isLandscape, dimensions);
  const {doctor_id, fromSignUpRoute} = route.params;

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

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

      setSelectedImage({
        uri: image.path,
        type: image.mime,
        width: image.width,
        height: image.height,
      });
      setCroppedImage(image.path);
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

      setSelectedImage({
        uri: image.path,
        type: image.mime,
        width: image.width,
        height: image.height,
      });
      setCroppedImage(image.path);
    } catch (error) {
      console.log('Error capturing image:', error);
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

  const prepareImageForUpload = async image => {
    if (!image.uri) {
      throw new Error('Invalid image URI');
    }

    if (image.uri.startsWith('file://')) {
      const fileExists = await RNFS.exists(image.uri.replace('file://', ''));
      if (!fileExists) {
        throw new Error('Image file not found');
      }
    }

    return {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: `profile_doctor_${doctor_id}_${Date.now()}.jpg`,
    };
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      showToast('Please select an image first', {
        type: 'error',
        duration: 3000,
      });
      return;
    }

    setIsUploading(true);

    try {
      const preparedImage = await prepareImageForUpload(selectedImage);
      const result = await UploadDoctorProfileImageRequest(
        preparedImage,
        doctor_id,
      );

      if (result.ok) {
        showToast('Image uploaded successfully', {
          type: 'success',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      showToast(error.message || 'Failed to upload image', {
        type: 'error',
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        navigation.navigate({
          name: 'DoctorClinicNavigator',
          params: {
            screen: 'DoctorAddClinic',
            params: {doctor_id: doctor_id, fromSignUpRoute: fromSignUpRoute},
          },
        });
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imagePickerContainer}>
          {croppedImage ? (
            <Image
              source={{uri: croppedImage}}
              style={styles.croppedImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>No image selected</Text>
            </View>
          )}

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

          {isUploading ? (
            <ActivityIndicator
              size="large"
              color="#007AFF"
              style={styles.loadingIndicator}
            />
          ) : (
            <TouchableOpacity
              style={[
                styles.uploadButton,
                !selectedImage && globalStyles.disabledButton,
              ]}
              onPress={handleImageUpload}
              disabled={!selectedImage}>
              <Text style={styles.uploadButtonText}>Update Profile Image</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.navigationButtonsContainer}>
          <TouchableOpacity
            style={[styles.navButton, styles.skipButton]}
            onPress={() =>
              navigation.navigate({
                name: 'DoctorClinicNavigator',
                params: {
                  screen: 'DoctorAddClinic',
                  params: {doctor_id: doctor_id},
                },
              })
            }>
            <Text style={[styles.navButtonText, styles.skipButtonText]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CaptureDoctorProfilePhotoScreen;
