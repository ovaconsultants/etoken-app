import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingErrorHandler = ({ isLoading, isError, error, isLandscape }) => {
  // Standard values that work well across devices
  const styles = createStyles(isLandscape);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loaderContainer}>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>⚠️ Error</Text>
          <Text style={styles.errorMessage}>
            {error?.message || 'Something went wrong'}
          </Text>
        </View>
      </View>
    );
  }

  return null;
};

const createStyles = (isLandscape) => StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: isLandscape ? '2%' : '5%', // Less padding in landscape
  },
  loaderBox: {
    backgroundColor: '#FFF',
    padding: '5%',
    borderRadius: 8, // Fixed value that works well
    alignItems: 'center',
    width: isLandscape ? '70%' : '90%', // Wider in landscape
    maxWidth: 400, // Prevent becoming too wide on tablets
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loaderText: {
    marginTop: '3%',
    fontSize: isLandscape ? 14 : 16, // Slightly smaller in landscape
    color: '#333',
    fontWeight: '500',
  },
  errorBox: {
    backgroundColor: '#FFF',
    padding: '5%',
    borderRadius: 8,
    alignItems: 'center',
    width: isLandscape ? '70%' : '90%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  errorText: {
    fontSize: isLandscape ? 16 : 18, // Adjusted for landscape
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: '2%',
  },
  errorMessage: {
    fontSize: isLandscape ? 14 : 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20, // Better text readability
  },
});

export default LoadingErrorHandler;