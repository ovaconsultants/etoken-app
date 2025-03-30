// ImageAd.js
import React from 'react';
import { Image, View, ActivityIndicator, StyleSheet , Text } from 'react-native';

const ImageAd = ({ source, style }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  return (
    <View style={[styles.container, style]}>
      <Image
        source={source}
        style={styles.media}
        resizeMode="contain"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
      {hasError && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorText}>Failed to load image.</Text>
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

export default ImageAd;
