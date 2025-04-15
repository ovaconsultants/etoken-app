import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {RefreshCw} from 'lucide-react-native';
import {ClinicValidationSchema} from '../../utils/formFields/validationSchemas/clinicSchemas';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import {AddClinicRequest} from '../../services/clinicService';
import styles from './DoctorAddClinicScreen.styles';

const DoctorAddClinicScreen = ({navigation, route}) => {
  console.log('Route Params:', route.params);
  const {doctor_id} = route?.params;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (
    values,
    {resetForm, setSubmitting, setErrors},
  ) => {
    const appendedValues = {
      ...values,
      doctor_id: doctor_id,
      created_by: 'admin',
    };
    try {
      const data = await AddClinicRequest(appendedValues);
      if (data.success) {
        Alert.alert('Success', data.message);
        resetForm();
        setSubmitted(true);
      } else {
        setErrors({general: data.error || 'Failed to create clinic'});
      }
    } catch (err) {
      setErrors({general: 'Network error. Please try again.'});
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
        }}
        validationSchema={ClinicValidationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit: formikSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          resetForm,
        }) => (
          <>
            {submitted ? (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>
                  Clinic added successfully!
                </Text>
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
                {Object.keys(values).map(key => (
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
                      keyboardType={key === 'zip_code' ? 'numeric' : 'default'}
                      editable={!isSubmitting}
                    />
                    <ErrorMessage error={errors[key]} visible={touched[key]} />
                  </View>
                ))}

                <ErrorMessage
                  error={errors.general}
                  visible={!!errors.general}
                />

                <View style={styles.buttonContainer}>
                  {isSubmitting ? (
                    <ActivityIndicator size="large" color="#007AFF" />
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          resetForm();
                          setSubmitted(false);
                        }}
                        style={styles.refreshButton}
                        disabled={isSubmitting}>
                        <RefreshCw
                          size={24}
                          color={isSubmitting ? '#ccc' : '#007AFF'}
                        />
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
          onPress={() =>
            navigation.navigate('AppNavigator', {
              screen: 'AuthNavigator',
              params: {screen: 'SignIn'},
            })
          }
        />
      </View>
    </ScrollView>
  );
};

export default DoctorAddClinicScreen;
