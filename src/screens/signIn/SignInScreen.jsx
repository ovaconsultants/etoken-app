import React from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {Formik} from 'formik';
import {useSetAtom} from 'jotai';
import {userTokenAtom} from '../../atoms/authAtoms/authAtom';
import {
  doctorClinicDetailsAtom,
  doctorIdAtom,
  doctorInfoAtom,
} from '../../atoms/doctorAtoms/doctorAtom';
import {styles} from './SignInScreen.styles';
import {SignInRequest} from '../../services/authService';
import {SignInValidationSchema} from '../../utils/formFields/validationSchemas/clinicSchemas';
import {setAuthToken} from '../../utils/tokenManager';

// Validation Schema using Yup

const SignInScreen = ({navigation}) => {
  // Jotai state management
  const setUserToken = useSetAtom(userTokenAtom);
  const setDoctorClinicDetails = useSetAtom(doctorClinicDetailsAtom);
  const setDoctorIdAtom = useSetAtom(doctorIdAtom);
  const setDoctorInfoAtom = useSetAtom(doctorInfoAtom)

  // Form submission handler
  const handleSignIn = async (values, {setSubmitting}) => {
    const {email, password} = values;

    try {
      const data = await SignInRequest(email, password);
      const doctorClincDetails = data.response;
      console.log('Doctor Details:', doctorClincDetails);

      if (!data.success) {
        throw new Error(data.message || 'Sign-in failed');
      }

      setUserToken(data.token);
      setAuthToken(data.token);
      const doctor_id = data.doctor_id ? data.doctor_id.toString() : '';
      const doctorInfo = {
        doctor_id: data.doctor_id,
        doctor_name: data.doctor_name,
        doctor_profile_pic_directory_api : data.profile_picture_url,
      };

      setDoctorIdAtom(doctor_id);
      setDoctorInfoAtom(doctorInfo);
      setDoctorClinicDetails(doctorClincDetails);
      console.log('Sign-in successful. Token:', data.token);
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={SignInValidationSchema}
        onSubmit={handleSignIn}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              autoCapitalize="none"
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Submit Button */}
            <Button
              title="Log In"
              onPress={handleSubmit}
              disabled={isSubmitting}
            />
          </>
        )}
      </Formik>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default SignInScreen;
