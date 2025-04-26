import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
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
import {SignInValidationSchema} from '../../utils/ClinicValidationSchema';
import {createStyles} from './SignInScreen.styles';
import {useOrientation} from '../../hooks/useOrientation';

const SignInScreen = ({navigation}) => {
  // Orientation basis styling
  const {isLandscape} = useOrientation();
  const styles = createStyles(isLandscape);

  // component token ,  doctor , clinic
  const setUserToken = useSetAtom(userTokenAtom);
  const setDoctorClinicDetails = useSetAtom(doctorClinicDetailsAtom);
  const setDoctorIdAtom = useSetAtom(doctorIdAtom);
  const setDoctorInfoAtom = useSetAtom(doctorInfoAtom);

  // handle sign Logic
  const handleSignIn = async (values, {setSubmitting}) => {
    const {email, password} = values;

    try {
      const data = await SignInRequest(email, password);
      if (!data.success) {
        throw new Error(data.message || 'Sign-in failed');
      }
      showToast('Login successful!', {
        type: 'success',
        duration: 3000,
      });
      setTimeout(() => {
        setUserToken(data.token);
      }, 2000);
      const doctorDetails = data.doctor;
      const doctor_id = doctorDetails.doctor_id?.toString() || '';

      setAuthToken(data.token);
      setDoctorIdAtom(doctor_id);
      setDoctorInfoAtom(doctorDetails);
      setDoctorClinicDetails(data.clinics);
    } catch (error) {
      console.error('Error signing in:', error);
      showToast(error.message || 'Login failed. Please try again.', {
        type: 'error',
        duration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
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
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isValid || !dirty || isSubmitting) && styles.buttonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!isValid || !dirty || isSubmitting}>
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Log In</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
