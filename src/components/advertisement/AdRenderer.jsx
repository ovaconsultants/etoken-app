// AdDisplay.js
import React from 'react';
import { View, Text } from 'react-native';
import ImageAd from './adElements/ImageAd';
import VideoAd from './adElements/ VideoAd';
import { mediaTypes } from '../../constants/advertisementsInfo/adMediaConfig';


const AdRenderer = ({ media, onEnd }) => {
  console.log('AdMedia: in media', media);
  console.trace();
  return (
    <View style={styles.container}>
      <View style={styles.fixedFrame}>
        {media.type === mediaTypes.IMAGE ? (
          <ImageAd source={media.source} style={styles.media} />
        ) : media.type === mediaTypes.VIDEO ? (
          <VideoAd source={media.source} style={styles.media} onEnd={onEnd} />
        ) : null}
        <View style={styles.textOverlay}>
          <Text style={styles.title}>{media.title}</Text>
          <Text style={styles.subtitle}>{media.subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

export default AdRenderer;

// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Background color for the frame
  },
  fixedFrame: {
    width: '90%', // Adjust width as needed
    aspectRatio: 16 / 9, // Fixed aspect ratio (16:9)
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // Ensure content stays within the frame
  },
  media: {
    width: '100%',
    height: '100%',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: 10,
    borderRadius: 5,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
