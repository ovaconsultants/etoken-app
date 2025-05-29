// components/EnlargeableImage.js
import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Modal, StyleSheet} from 'react-native';

const EnlargeableImage = ({
  imageUrl,
  defaultImage = require('../../../assets/patient.png'),
  imageStyle,
  modalImageStyle,
  containerStyle,
}) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={() => setIsEnlarged(true)}>
        <Image
          source={imageUrl ? {uri: imageUrl} : defaultImage}
          style={[styles.image, imageStyle]}
        />
      </TouchableOpacity>

      {isEnlarged && (
        <Modal transparent visible animationType="fade">
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setIsEnlarged(false)}
            activeOpacity={1}>
            <Image
              source={imageUrl ? {uri: imageUrl} : defaultImage}
              style={[styles.modalImage, modalImageStyle]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Default container styles
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '80%',
  },
});

export default EnlargeableImage;
