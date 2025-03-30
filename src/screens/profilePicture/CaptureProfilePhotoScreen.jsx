import React, {useState} from 'react';
import {View, Button, Alert, ActivityIndicator} from 'react-native';
import ImagePickerComponent from '../../imagePickerComponent/ImagePickerComponent';
import styles from './CaptureProfilePhotoScreen.styles';
import {UploadDoctorProfileImageRequest} from '../../services/profileImageService';
import RNFS from 'react-native-fs';

const CaptureProfilePhotoScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const doctorId = 2;

  const prepareImageForUpload = async (image) => {
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
      name: `profile_doctor_${doctorId}_${Date.now()}.jpg`,
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

      const result = await UploadDoctorProfileImageRequest(preparedImage, doctorId);
      
      Alert.alert('Success', 'Profile image updated successfully');
      console.log('Upload result:', result);
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Error', error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerComponent
        onImageSelected={(image) => {
          setSelectedImage({
            uri: image.uri,
            type: image.type || 'image/jpeg',
          });
        }}
        initialImage={selectedImage?.uri}
      />

      {isUploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Update Profile Image"
          onPress={handleImageUpload}
          disabled={!selectedImage}
        />
      )}
    </View>
  );
};

export default CaptureProfilePhotoScreen;