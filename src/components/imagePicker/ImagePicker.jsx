import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, Alert, Text} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import styles from './ImagePicker.styles';

const ImagePicker = ({initialImage, onImageSelected}) => {
  const [imageUri, setImageUri] = useState(initialImage);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const prepareImageForUpload = async uri => {
    try {
      if (uri.startsWith('file://')) {
        const filePath = uri.replace('file://', '');
        const exists = await RNFS.exists(filePath);
        if (!exists) {
          throw new Error('Image file not found');
        }
      }

      const fileInfo = await RNFS.stat(uri.replace('file://', ''));
      return {
        uri,
        type: 'image/jpeg',
        name: `image_${Date.now()}.jpg`,
        size: fileInfo.size,
      };
    } catch (error) {
      console.error('Image preparation error:', error);
      throw error;
    }
  };

  const handleImageResponse = async response => {
    if (!isMounted) {
      return;
    }
    if (response.didCancel) {
      return;
    }

    if (response.errorMessage) {
      Alert.alert('Error', response.errorMessage);
      return;
    }

    const imageAsset = response.assets?.[0];
    if (!imageAsset) {
      return;
    }

    try {
      const preparedImage = await prepareImageForUpload(imageAsset.uri);
      setImageUri(imageAsset.uri);
      onImageSelected(preparedImage);
    } catch (error) {
      Alert.alert('Error', 'Failed to process image: ' + error.message);
    }
  };

  const openGallery = async () => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 0.8,
        includeExtra: true,
      };
      const response = await launchImageLibrary(options);
      handleImageResponse(response);
    } catch (error) {
      Alert.alert('Error', 'Failed to open gallery: ' + error.message);
    }
  };

  const openCamera = async () => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
        cameraType: 'back',
      };
      const response = await launchCamera(options);
      handleImageResponse(response);
    } catch (error) {
      Alert.alert('Error', 'Failed to open camera: ' + error.message);
    }
  };

  const handleImagePicker = () => {
    if (!isMounted) {
      return;
    }
    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        {text: 'Take Photo', onPress: openCamera},
        {text: 'Pick from Gallery', onPress: openGallery},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleImagePicker}
        style={styles.placeholder}
        activeOpacity={0.7}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>📷 Upload Image</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;
