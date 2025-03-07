import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './TokenSuccessScreen.style';
import { useNavigation } from '@react-navigation/native';

const TokenSuccessScreen = ({ route }) => {
  const { tokenNumber, patientName, patientId } = route.params; // Destructure route params
  const navigation = useNavigation();

  // Automatically navigate back after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.goBack();
    }, 20000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.header}>Token Generated Successfully</Text>

        {/* Patient Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Patient ID:</Text>
          <Text style={styles.detailValue}>{patientId}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Patient Name:</Text>
          <Text style={styles.detailValue}>{patientName}</Text>
        </View>

        {/* Token Number */}
        <Text style={styles.tokenText}>Token No : {tokenNumber}</Text>

        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TokenSuccessScreen;
