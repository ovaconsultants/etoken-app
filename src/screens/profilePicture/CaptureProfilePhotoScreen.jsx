import React, {useState} from 'react';
import {View, Button, Alert, ActivityIndicator} from 'react-native';
import ImagePickerComponent from '../../imagePickerComponent/ImagePickerComponent';
import styles from './CaptureProfilePhotoScreen.styles';
import {UploadDoctorProfileImageRequest} from '../../services/profileImageService';
import {doctorIdAtom} from '../../atoms/doctorAtoms/doctorAtom';
import {useAtomValue} from 'jotai';

const CaptureProfilePhotoScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const doctorId = 2;
  const handleImageUpload = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setIsUploading(true);

    try {
      const result = await UploadDoctorProfileImageRequest(
        selectedImage,
        doctorId,
      );

      Alert.alert('Success', 'Profile image updated successfully');
      console.log('Image URL:', result.imageUrl);
    } catch (error) {
      Alert.alert('Upload Error', error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerComponent
        onImageSelected={setSelectedImage}
        initialImage={selectedImage?.uri}
      />

      {isUploading ? (
        <ActivityIndicator size="large" />
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
