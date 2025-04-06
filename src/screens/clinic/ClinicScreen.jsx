  import React, { useState } from 'react';
  import { View, Text, TextInput, ScrollView, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
  import { Formik } from 'formik';
  import { RefreshCw } from 'lucide-react-native';
  import { ClinicValidationSchema,} from '../../utils/ClinicValidationSchema';
  import { AddClinicRequest } from '../../services/clinicService';
  import { showToast,ToastMessage } from '../../components/toastMessage/ToastMessage';
  import styles from './ClinicScreen.styles';

  const ClinicScreen = ({ navigation, route }) => {
    const { doctor_id } = route?.params;
    const [submitted, setSubmitted] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    // List of required fields from your schema
    const requiredFields = {
      clinic_name: true,
      address: true,
      city: true,
      state: true,
      zip_code: true
    };

    const handleFieldBlur = (fieldName, value) => {
      setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
      try {
        ClinicValidationSchema.validateSyncAt(fieldName, { [fieldName]: value });
        setFieldErrors(prev => ({ ...prev, [fieldName]: false }));
      } catch {
        setFieldErrors(prev => ({ ...prev, [fieldName]: true }));
      }
    };

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
      const appendedValues = {
        ...values,
        doctor_id: doctor_id,
        created_by: 'admin',
      };
      
      try {
        const data = await AddClinicRequest(appendedValues);
        if (data.success) {
          showToast('Clinic created successfully!', 'success');
          resetForm();
          setSubmitted(true);
          setFieldErrors({});
          setTouchedFields({});
        } else {
          showToast(data.error || 'Failed to create clinic', 'error');
        }
      } catch (err) {
        showToast('Network error. Please try again.', 'error');
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ToastMessage />
        <Formik
          initialValues={{
            clinic_name: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
          }}
          validationSchema={ClinicValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit: formikSubmit, values, isSubmitting, resetForm }) => (
            <>
              {submitted ? (
                <View style={styles.successContainer}>
                  <Text style={styles.successText}>Clinic added successfully!</Text>
                  <Button
                    title="Add Another Clinic"
                    onPress={() => {
                      resetForm();
                      setSubmitted(false);
                    }}
                  />
                </View>
              ) : (
                <>
                  {Object.keys(values).map((key) => (
                    <View key={key} style={styles.inputContainer}>
                      <Text style={styles.label}>
                        {key.replace(/_/g, ' ').toUpperCase()}
                        {requiredFields[key] && <Text> *</Text>}
                      </Text>
                      <TextInput
                        style={[
                          styles.input,
                          touchedFields[key] && fieldErrors[key] && styles.errorInput
                        ]}
                        value={values[key]}
                        onChangeText={(text) => {
                          handleChange(key)(text);
                          if (fieldErrors[key]) {
                            try {
                              ClinicValidationSchema.validateSyncAt(key, { [key]: text });
                              setFieldErrors(prev => ({ ...prev, [key]: false }));
                            } catch {
                              // Keep field as error if still invalid
                            }
                          }
                        }}
                        onBlur={() => handleFieldBlur(key, values[key])}
                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                        keyboardType={key === 'zip_code' ? 'numeric' : 'default'}
                        editable={!isSubmitting}
                      />
                    </View>
                  ))}

                  <View style={styles.buttonContainer}>
                    {isSubmitting ? (
                      <ActivityIndicator size="large" color="#007AFF" />
                    ) : (
                      <>
                        <TouchableOpacity 
                          onPress={() => {
                            resetForm();
                            setSubmitted(false);
                            setFieldErrors({});
                            setTouchedFields({});
                          }}
                          style={styles.refreshButton}
                          disabled={isSubmitting}
                        >
                          <RefreshCw size={24} color={isSubmitting ? '#ccc' : '#007AFF'} />
                        </TouchableOpacity>
                        <Button 
                          title="Submit" 
                          onPress={formikSubmit} 
                          disabled={isSubmitting}
                        />
                      </>
                    )}
                  </View>
                </>
              )}
            </>
          )}
        </Formik>

        <View style={styles.footer}>
          <Button
            title="Skip"
            onPress={() => navigation.navigate('AppNavigator', { screen: 'AuthNavigator', params: { screen: 'SignIn' } })}
          />
        </View>
      </ScrollView>
    );
  };

  export default ClinicScreen;