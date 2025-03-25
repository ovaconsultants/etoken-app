import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';

export const PatientInfoScreen = ({ route, navigation }) => {
  // Get patient information from the previous screen
  const { patientInfo } = route.params;

  // State for the "Paid/Unpaid" toggle
  const [isPaid, setIsPaid] = useState(patientInfo.isPaid);

  // Handle save action
  const handleSave = () => {
    const updatedInfo = { ...patientInfo, isPaid };
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Patient Information</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{patientInfo.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{patientInfo.age}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Condition:</Text>
        <Text style={styles.value}>{patientInfo.condition}</Text>
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Payment Status:</Text>
        <Switch
          value={isPaid}
          onValueChange={(value) => setIsPaid(value)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isPaid ? '#007BFF' : '#f4f3f4'}
        />
        <Text style={styles.toggleText}>{isPaid ? 'Paid' : 'Unpaid'}</Text>
      </View>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PatientInfoScreen;
