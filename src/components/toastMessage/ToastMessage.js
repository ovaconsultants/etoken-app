import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const styles = StyleSheet.create({
  toastContainer: {
    height: 60,
    width: '90%',
    backgroundColor: '#9EC6F3',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 6, // This will be our colored edge
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10, // Add padding to separate text from edge
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

const toastConfig = {
  success: ({ text1, props }) => (
    <View style={[styles.toastContainer, { borderLeftColor: '#4CAF50' }]}>
      <View style={styles.content}>
        <Text style={styles.text}>{text1}</Text>
      </View>
    </View>
  ),
  error: ({ text1, props }) => (
    <View style={[styles.toastContainer, { borderLeftColor: '#f44336' }]}>
      <View style={styles.content}>
        <Text style={styles.text}>{text1}</Text>
      </View>
    </View>
  ),
  info: ({ text1, props }) => (
    <View style={[styles.toastContainer, { borderLeftColor: '#2196F3' }]}>
      <View style={styles.content}>
        <Text style={styles.text}>{text1}</Text>
      </View>
    </View>
  ),
};

export const showToast = (message, type = 'success') => {
  Toast.show({
    type: type,
    text1: message,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 100,
    bottomOffset: 40,
  });
};

export const ToastMessage = () => {
  return <Toast config={toastConfig} ref={Toast.setRef} />;
};