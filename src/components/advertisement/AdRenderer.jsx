import React from 'react';
import { View, Text } from 'react-native';
import ImageAd from './adElements/ImageAd';
import VideoAd from './adElements/ VideoAd';
import { mediaTypes } from '../../constants/advertisementConfigData/adMediaConfig';

const AdRenderer = ({ media, onEnd }) => {
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
import { StyleSheet } from 'react-native';

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  fixedFrame: {
    width: '90%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    overflow: 'hidden',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});