import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

const styles = StyleSheet.create({
  toastContainer: {
    height: 70,
    width: '100%',
    backgroundColor: '#E4EFE7',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'scroll',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderLeftWidth: 6,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex : 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    lineHeight: 20,
  },
  closeButton: {
    paddingLeft: 10,
    paddingRight: 5,
    justifyContent: 'center',
  },
  closeText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const toastConfig = {
  success: ({ text1, text2, props }) => (
    <View style={[styles.toastContainer, { borderLeftColor: '#4CAF50' }]}>
      <View style={styles.content}>
        <Text style={styles.text}>{text1}</Text>
        {text2 && <Text style={[styles.text, { fontSize: 12, color: '#666' }]}>{text2}</Text>}
      </View>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => Toast.hide()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </View>
  ),
  
  error: ({ text1, text2, props }) => (
    <View style={[styles.toastContainer, { 
      borderLeftColor: '#F44336',
      backgroundColor: '#FFFFFF'
    }]}>
      <View style={styles.content}>
        <Text style={[styles.text, { color: '#D32F2F' }]}>{text1}</Text>
        {text2 && <Text style={[styles.text, { fontSize: 12, color: '#666' }]}>{text2}</Text>}
      </View>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => Toast.hide()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={[styles.closeText, { color: '#D32F2F' }]}>×</Text>
      </TouchableOpacity>
    </View>
  ),
  
  info: ({ text1, text2, props }) => (
    <View style={[styles.toastContainer, { borderLeftColor: '#2196F3' }]}>
      <View style={styles.content}>
        <Text style={styles.text}>{text1}</Text>
        {text2 && <Text style={[styles.text, { fontSize: 12, color: '#666' }]}>{text2}</Text>}
      </View>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => Toast.hide()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </View>
  ),
};

export const showToast = (message, options = {}) => {
  const {
    type = 'success',
    secondaryText = '',
    duration = 3000,
    onHide = null,
    onPress = null,
    navigation = null,
    navigateTo = null,
  } = options;

  Toast.show({
    type: type,
    text1: message,
    text2: secondaryText,
    position: 'top',
    visibilityTime: duration,
    autoHide: true,
    topOffset: 50,
    bottomOffset: 40,
    // zIndex: 100000,
    onHide: () => {
      onHide?.();
      if (navigation && navigateTo) {
        navigation.navigate(navigateTo);
      }
    },
    onPress: () => {
      onPress?.();
      Toast.hide();
      if (navigation && navigateTo) {
        navigation.navigate(navigateTo);
      }
    },
    props: options.props || {},
  });
};

export const ToastMessage = () => {
  return <Toast config={toastConfig} />;
};