import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LoadingErrorHandler = ({ isLoading, isError, error }) => {
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
          <Text style={styles.errorMessage}>{error.message}</Text>
        </View>
      </View>
    );
  }

  return null;
};

export default LoadingErrorHandler;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
  },
  loaderBox: {
    backgroundColor: '#FFF',
    padding: wp('5%'), // Responsive padding
    borderRadius: wp('2%'), // Responsive border radius
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loaderText: {
    marginTop: hp('1%'), // Responsive margin
    fontSize: wp('4%'), // Responsive font size
    color: '#333',
    fontWeight: '500',
  },
  errorBox: {
    backgroundColor: '#FFF',
    padding: wp('5%'), // Responsive padding
    borderRadius: wp('2%'), // Responsive border radius
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  errorText: {
    fontSize: wp('4.5%'), // Responsive font size
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: hp('1%'), // Responsive margin
  },
  errorMessage: {
    fontSize: wp('4%'), // Responsive font size
    color: '#555',
    textAlign: 'center',
  },
});