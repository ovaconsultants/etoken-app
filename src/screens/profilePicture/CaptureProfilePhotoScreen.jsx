import React, { useState } from 'react';
import { View, Button, Alert, ActivityIndicator } from 'react-native';
import ImagePickerComponent from '../../imagePickerComponent/ImagePickerComponent';
import styles from './CaptureProfilePhotoScreen.styles';
import { uploadDoctorProfilePicture } from '../../services/authService';
import { doctorIdAtom } from '../../atoms/doctorAtoms/doctorAtom';
import { useAtomValue } from 'jotai';

const CaptureProfilePhotoScreen = ({navigation}) => {
  const doctorId = useAtomValue(doctorIdAtom);
  console.log("Doctor id in Profile screen", doctorId);
  console.trace();
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 // Replace with dynamic ID

 const navigateToClinicScreen = () => {
  console.log("This is called navigation for clinic screen .");
  navigation.navigate('ClinicNavigator');
};

  const handleUpload = async () => {
    if (!profileImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setIsLoading(true);
    try {
      const response = await uploadDoctorProfilePicture(profileImage, doctorId);
      
      if (response.success) {
        Alert.alert('Success', 'Profile picture updated successfully');
        navigateToClinicScreen();
        
      } else {
        Alert.alert('Error', response.message || 'Update failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerComponent
        initialImage={profileImage}
        onImageSelected={setProfileImage}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Update Profile Picture"
          onPress={handleUpload}
          disabled={!profileImage || isLoading}
        />
      )}
    </View>
  );
};

export default CaptureProfilePhotoScreen;