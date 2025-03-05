import React, { useState , useEffect} from "react";
import { View, TouchableOpacity, Image, Alert, Text } from "react-native";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import RNFS from "react-native-fs";
import styles from "./ImagePickerComponent.styles";

const ImagePickerComponent = ({ initialImage, onImageSelected }) => {
  const [imageUri, setImageUri] = useState(initialImage);

  const openGallery = async () => {
    console.log("Opening Gallery...");
    const options = { mediaType: "photo", quality: 0.8 };
    const response = await launchImageLibrary(options);
    handleImageResponse(response);
  };

  const openCamera = async () => {
    console.log("Opening Camera...");
    const options = { mediaType: "photo", quality: 0.8, saveToPhotos: true };
    const response = await launchCamera(options);
    handleImageResponse(response);
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  const handleImagePicker = () => {
    if (!isMounted) return; // Ensure the component is mounted
    Alert.alert(
      "Upload Image",
      "Choose an option",
      [
        { text: "Take Photo", onPress: openCamera },
        { text: "Pick from Gallery", onPress: openGallery },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };
  const handleImageResponse = async (response) => {
    if (response.didCancel) return;
    if (response.errorMessage) {
      Alert.alert("Error", response.errorMessage);
      return;
    }
  
    const imageAsset = response.assets[0];
    if (imageAsset) {
      setImageUri(imageAsset.uri);
      onImageSelected(imageAsset.uri); // Use original URI instead of copying
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleImagePicker} 
        style={styles.placeholder}
        activeOpacity={0.7}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>📷 Upload Image</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerComponent;


