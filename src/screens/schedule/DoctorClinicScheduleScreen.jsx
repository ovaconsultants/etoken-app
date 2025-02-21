import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {userTokenAtom} from '../../atoms/authAtoms/authAtom';
import {useSetAtom} from 'jotai';
import {ScheduleValidationSchema} from '../../utils/formFields/validationSchemas/clinicSchemas';
import {Formik} from 'formik';
import ErrorMessage from '../../components/ErrorMessage';
import {AddDoctorClinicScheduleRequest} from '../../services/doctorService';
import styles from './DoctorClinicScheduleScreen.styles';

const DoctorClinicScheduleScreen = ({navigation}) => {
  const setIsAuthenticated = useSetAtom(userTokenAtom);
  console.log(navigation.getParent().getState());

  const [submitted, setSubmitted] = React.useState(false);
  const handleSubmit = async (
    values,
    {resetForm, setSubmitting, setErrors},
  ) => {
    try {
      const data = await AddDoctorClinicScheduleRequest(values);
      if (data.success) {
        resetForm();
        setSubmitted(true);
      } else {
        setErrors({general: data.error || 'Failed to create schedule'});
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
          doctor_id: '',
          clinic_id: '',
          day_of_week: '',
          start_time: '',
          end_time: '',
          created_by: '',
        }}
        validationSchema={ScheduleValidationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit: formikSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            {submitted ? (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>
                  Schedule added successfully!
                </Text>
                <Button
                  title="Add Another Schedule"
                  onPress={() => {
                    setSubmitted(false); // Hide success message and show the form again
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
                      keyboardType={
                        key === 'doctor_id' || key === 'clinic_id'
                          ? 'numeric'
                          : 'default'
                      }
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
          title="Go to Sign in"
          onPress={() => {
            setIsAuthenticated(null);
            navigation.navigate('AppNavigator');
          }}
        />
      </View>
    </ScrollView>
  );
};


export default DoctorClinicScheduleScreen;
