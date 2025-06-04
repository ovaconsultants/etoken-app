import React , { useState, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';

import FastImage from 'react-native-fast-image';
import { GetDoctorProfileImageRequest } from '../../services/profileImageService';

const ProfileImageRenderer = ({doctor_id}) => {
  const [imageUrl, setImageUrl] = useState(null);

  // Fetch profile image
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const uri = await GetDoctorProfileImageRequest(doctor_id);
        if (uri) {setImageUrl(uri);}
      } catch (error) {
        console.warn('Failed to load profile image:', error);
      }
    };

    if (doctor_id) {
      fetchProfileImage();
    }
  }, [doctor_id]);
  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <FastImage
          source={{uri: imageUrl}}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  profileImageContainer: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: 'rgb(93, 101, 208)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },

});

export default ProfileImageRenderer ;
