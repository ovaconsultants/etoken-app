import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ImagePickerComponent from '../../imagePickerComponent/ImagePickerComponent';
import styles from './CaptureProfilePhotoScreen.styles';
import {UploadDoctorProfileImageRequest} from '../../services/profileImageService';
import {showToast} from '../../components/toastMessage/ToastMessage';
import RNFS from 'react-native-fs';

const CaptureProfilePhotoScreen = ({navigation, route}) => {
  const {doctor_id} = route.params;
  console.log('Doctor ID:', doctor_id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setIsUploading(true);

    try {
      const preparedImage = await prepareImageForUpload(selectedImage);
      console.log('Prepared image:', preparedImage);

      const result = await UploadDoctorProfileImageRequest(
        preparedImage,
        doctor_id,
      );
      showToast(result.message, {
        type: result.success ? 'success' : 'error',
        duration: 3000,
      });
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
            params: {doctor_id: doctor_id},
          },
        });
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imagePickerContainer}>
          <ImagePickerComponent
            onImageSelected={image => {
              setSelectedImage({
                uri: image.uri,
                type: image.type || 'image/jpeg',
              });
            }}
            initialImage={selectedImage?.uri}
          />
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
                !selectedImage && styles.buttonDisabled,
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

export default CaptureProfilePhotoScreen;
