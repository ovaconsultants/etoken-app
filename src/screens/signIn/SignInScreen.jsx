import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {Formik} from 'formik';
import {useSetAtom} from 'jotai';
import {userTokenAtom} from '../../atoms/authAtoms/authAtom';
import {
  doctorClinicDetailsAtom,
  doctorIdAtom,
  doctorInfoAtom,
} from '../../atoms/doctorAtoms/doctorAtom';
import {SignInRequest} from '../../services/authService';
import {setAuthToken} from '../../utils/tokenManager';
import {showToast} from '../../components/toastMessage/ToastMessage';
import styles from './SignInScreen.styles';
import { SignInValidationSchema } from '../../utils/ClinicValidationSchema';


const SignInScreen = ({navigation}) => {
  const setUserToken = useSetAtom(userTokenAtom);
  const setDoctorClinicDetails = useSetAtom(doctorClinicDetailsAtom);
  const setDoctorIdAtom = useSetAtom(doctorIdAtom);
  const setDoctorInfoAtom = useSetAtom(doctorInfoAtom);

  const handleSignIn = async (values, {setSubmitting}) => {
    const {email, password} = values;
  
    try {
      const data = await SignInRequest(email, password);
      if (!data.success) {
        throw new Error(data.message || 'Sign-in failed');
      }
  
      const doctorDetails = data.doctor;
      const doctor_id = doctorDetails.doctor_id?.toString() || '';
  
      setUserToken(data.token);
      setAuthToken(data.token);
      setDoctorIdAtom(doctor_id);
      setDoctorInfoAtom(doctorDetails);
      setDoctorClinicDetails(data.clinics);
  
      console.log('Showing success toast');
  showToast('Login successful!', {
    type: 'success',
    duration: 3000
  });
    } catch (error) {
      console.error('Error signing in:', error);
      showToast(error.message || 'Login failed. Please try again.', {
        type: 'error',
        duration: 3000
      });
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
        onSubmit={handleSignIn}
        validateOnChange={true}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          isValid,
          dirty,
        }) => (
          <>
            <TextInput
              style={[
                styles.input,
                touched.email && errors.email && styles.inputError,
              ]}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={50}
            />

            <TextInput
              style={[
                styles.input,
                touched.password && errors.password && styles.inputError,
              ]}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              autoCapitalize="none"
              maxLength={15}
            />

            <Button
              title="Log In"
              onPress={handleSubmit}
              disabled={!isValid || !dirty || isSubmitting}
              color={!isValid || !dirty || isSubmitting ? '#add8e6' : undefined}
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