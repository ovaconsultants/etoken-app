import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './ClinicScreen.styles';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {AddClinicRequest} from '../../services/clinicService';

const ClinicScreen = ({navigation}) => {
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
  const [submitted, setSubmitted] = useState(false);

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
      console.log('This is the form data', formData);
      const data = await AddClinicRequest(formData);
      if (data.success) {
        Alert.alert('Success', data.message);
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to create clinic');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMore = () => {
    setFormData({
      clinic_name: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      doctor_id: '',
      created_by: '',
    });
    setSubmitted(false);
  };

  return (
    <SafeAreaInsetsContext.Provider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <View style={styles.container}>
          {/* Scrollable Content */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            bounces={false}>
            {submitted ? (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>
                  Clinic added successfully!
                </Text>
                <Text style={styles.button} onPress={handleAddMore}>
                  Add Another Clinic
                </Text>
              </View>
            ) : (
              <>
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
                        key === 'zip_code' || key === 'doctor_id'
                          ? 'numeric'
                          : 'default'
                      }
                      editable={!loading}
                    />
                  </View>
                ))}
                <View style={styles.footer}>
                  <Button
                    title="Go to Schedule"
                    onPress={() => navigation.navigate('DoctorClinicSchedule')}
                  />
                </View>
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
              </>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Button
              title="Go to Schedule"
              onPress={() => navigation.navigate('DoctorClinicSchedule')}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaInsetsContext.Provider>
  );
};

export default ClinicScreen;
