import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InfoSymbol = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.text}>i</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InfoSymbol;