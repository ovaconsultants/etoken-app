import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import styles from './GenerateTokenScreen.style';

const GenerateTokenScreen = ({ tokenNumber, isModalVisible, setIsModalVisible }) => {
  useEffect(() => {
    if (isModalVisible) {
      const timer = setTimeout(() => {
        setIsModalVisible(false); 
       }, 3000); 
     return () => clearTimeout(timer);
    }
  }, [isModalVisible,setIsModalVisible]);

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>New Token Generated</Text>
          <Text style={styles.tokenText}>{tokenNumber}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={() => setIsModalVisible(false)} color="#007AFF" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GenerateTokenScreen;