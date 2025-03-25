import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, } from 'react-native';
import { styles } from './PatientInfoEditorReceptionScreen.styles';
import { UpdatePatientRequest } from '../../services/patientService';

export const PatientInfoEditorScreen = ({ route, navigation }) => {
  // Get patient information from the previous screen
  const { patientInfo } = route.params;

  // State for the "Paid/Unpaid" toggle
  const [isPaid, setIsPaid] = useState(patientInfo.fee_status === 'Paid');

  // Handle save action
  const handleSave = async () => {
    const updatedInfo = {
      ...patientInfo,
      fee_status: isPaid ? 'Paid' : 'Not Paid', // Update fee_status based on toggle
    };
    // Call your API or update state here
    await UpdatePatientRequest(updatedInfo);
    navigation.goBack(); // Navigate back after saving
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Patient Information</Text>

      {/* Display Patient Details */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{patientInfo.patient_name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Token No:</Text>
        <Text style={styles.value}>{patientInfo.token_no}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{patientInfo.status}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Emergency:</Text>
        <Text style={styles.value}>{patientInfo.emergency === 'Y' ? 'Yes' : 'No'}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fee Amount:</Text>
        <Text style={styles.value}>{patientInfo.fee_amount}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fee Status:</Text>
        <Text style={styles.value}>{patientInfo.fee_status}</Text>
      </View>

      {/* Toggle for Paid/Unpaid */}
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Payment Status:</Text>
        <Switch
          value={isPaid}
          onValueChange={(value) => setIsPaid(value)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isPaid ? '#007BFF' : '#f4f3f4'}
        />
        <Text style={styles.toggleText}>{isPaid ? 'Paid' : 'Not Paid'}</Text>
      </View>

      {/* Save and Close Buttons */}
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

