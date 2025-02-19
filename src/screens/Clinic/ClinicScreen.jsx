import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './ClinicScreen.styles';

const ClinicScreen = () => {
  const [formData, setFormData] = useState({
    clinic_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    doctor_id: '',
    created_by: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (name, value) => {
    setFormData(prev => ({...prev, [name]: value}));
  };

  const validateForm = () => {
    if (!Object.values(formData).every(field => field.trim())) {
      setError('All fields are required');
      return false;
    }
    if (formData.zip_code.length !== 5) {
      setError('Zip code must be 5 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        'https://etoken-api-dev.vercel.app/api/doctor/addClinic',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            doctor_id: Number(formData.doctor_id),
          }),
        },
      );

      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', data.message);
        setFormData({
          clinic_name: '',
          address: '',
          city: '',
          state: '',
          zip_code: '',
          doctor_id: '',
          created_by: '',
        });
      } else {
        setError(data.error || 'Failed to create clinic');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Add New Clinic</Text> */}

      {Object.entries(formData).map(([key, value]) => (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>
            {key.replace(/_/g, ' ').toUpperCase()}
          </Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={text => handleInputChange(key, text)}
            placeholder={`Enter ${key.replace(/_/g, ' ')}`}
            keyboardType={
              key === 'zip_code' || key === 'doctor_id' ? 'numeric' : 'default'
            }
            editable={!loading}
          />
        </View>
      ))}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Text style={styles.button} onPress={handleSubmit}>
            Submit
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ClinicScreen;
