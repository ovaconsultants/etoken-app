// VideoAd.js
import React, {useState} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import Video from 'react-native-video';

const VideoAd = ({source, style, onEnd}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  return (
    <View style={[styles.container, style]}>
      <Video
        source={{uri: source}}
        style={styles.media}
        resizeMode="cover"
        repeat={false}
        controls={false}
        paused={false}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        onEnd={onEnd}
      />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
      {hasError && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorText}>Failed to load video.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
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

export default VideoAd;
