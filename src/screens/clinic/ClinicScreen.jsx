// screens/ClinicScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, ActivityIndicator, Button } from 'react-native';
import { Formik } from 'formik';
import { ClinicValidationSchema } from '../../utils/formFields/validationSchemas/clinicSchemas';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { AddClinicRequest } from '../../services/clinicService';
import styles from './ClinicScreen.styles';

const ClinicScreen = ({ navigation }) => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (values, { resetForm, setSubmitting, setErrors }) => {
    try {
      const data = await AddClinicRequest(values);
      if (data.success) {
        Alert.alert('Success', data.message);
        resetForm();
        setSubmitted(true);
      } else {
        setErrors({ general: data.error || 'Failed to create clinic' });
      }
    } catch (err) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          clinic_name: '',
          address: '',
          city: '',
          state: '',
          zip_code: '',
          doctor_id: '',
          created_by: '',
        }}
        validationSchema={ClinicValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit: formikSubmit, values, errors, touched, isSubmitting }) => (
          <>
            {submitted ? (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>Clinic added successfully!</Text>
                <Button
                  title="Add Another Clinic"
                  onPress={() => {
                    setSubmitted(false); // Hide success message and show the form again
                  }}
                />
              </View>
            ) : (
              <>
                {Object.keys(values).map((key) => (
                  <View key={key} style={styles.inputContainer}>
                    <Text style={styles.label}>
                      {key.replace(/_/g, ' ').toUpperCase()}
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={values[key]}
                      onChangeText={handleChange(key)}
                      onBlur={handleBlur(key)}
                      placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                      keyboardType={
                        key === 'zip_code' || key === 'doctor_id' ? 'numeric' : 'default'
                      }
                      editable={!isSubmitting}
                    />
                    <ErrorMessage error={errors[key]} visible={touched[key]} />
                  </View>
                ))}

                <ErrorMessage error={errors.general} visible={!!errors.general} />

                <View style={styles.buttonContainer}>
                  {isSubmitting ? (
                    <ActivityIndicator size="large" color="#007AFF" />
                  ) : (
                    <Button title="Submit" onPress={formikSubmit} />
                  )}
                </View>
              </>
            )}
          </>
        )}
      </Formik>

      <View style={styles.footer}>
        <Button
          title="Go to Schedule"
          onPress={() => navigation.navigate('DoctorClinicSchedule')}
        />
      </View>
    </ScrollView>
  );
};

export default ClinicScreen;
