// components/ErrorMessage.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ error, visible }) => {
  if (!visible || !error) {
    return null;
  }

  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
});

export default ErrorMessage;
