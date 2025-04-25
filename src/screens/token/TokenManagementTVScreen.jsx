import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingErrorHandler = ({ isLoading = false, isError = false, error = '', isLandscape = false }) => {
  const colorScheme = {
    loading: {
      primary: '#007BFF',  // Soft blue
      background: '#F8FAFD',  // Very light blue-gray
      text: '#4A5568',  // Dark gray-blue
    },
    error: {
      primary: '#FC8181',  // Soft red
      background: '#FFF5F5',  // Very light red
      text: '#718096',  // Gray-blue
      accent: '#E53E3E',  // Stronger red for titles
    },
  };

  const styles = createStyles(isLandscape, colorScheme);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <View style={styles.loaderCard}>
          <ActivityIndicator size="large" color={colorScheme.loading.primary} />
          <Text style={styles.loaderText}>Loading content...</Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loaderContainer}>
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Connection Error</Text>
          <Text style={styles.errorMessage}>
            {error?.message || 'Unable to load content. Please try again.'}
          </Text>
          <Text style={styles.errorTip}>Check your connection and pull to refresh</Text>
        </View>
      </View>
    );
  }

  return null;
};

const createStyles = (isLandscape, colors) => StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 250, 253, 0.95)',
    zIndex: 1000,
  },
  loaderCard: {
    backgroundColor: colors.loading.background,
    padding: 24,
    borderRadius: 14,
    alignItems: 'center',
    width: isLandscape ? '65%' : '85%',
    maxWidth: 450,
    borderWidth: 1,
    borderColor: 'rgba(93, 156, 236, 0.15)',
    elevation: 3,
    shadowColor: colors.loading.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.loading.text,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  errorCard: {
    backgroundColor: colors.error.background,
    padding: 24,
    borderRadius: 14,
    alignItems: 'center',
    width: isLandscape ? '65%' : '85%',
    maxWidth: 450,
    borderWidth: 1,
    borderColor: 'rgba(252, 129, 129, 0.15)',
    elevation: 3,
    shadowColor: colors.error.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 12,
    color: colors.error.accent,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.error.accent,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 15,
    color: colors.error.text,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorTip: {
    fontSize: 13,
    color: colors.error.text,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.8,
  },
});

export default LoadingErrorHandler;
