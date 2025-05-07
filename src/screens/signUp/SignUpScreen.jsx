import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Formik} from 'formik';
import { SignUpValidationSchema } from '../../utils/SignUpValidation';
import {
  FetchAccountRequest,
  FetchSpecializationsRequest,
  SignUpRequest,
} from '../../services/accountService';
import {showToast} from '../../components/toastMessage/ToastMessage';
import {useOrientation} from '../../hooks/useOrientation';
import {createStyles} from './SignUpScreen.styles';


const SignUpScreen = ({navigation}) => {
  const {isLandscape, dimensions} = useOrientation();
  const styles = createStyles(isLandscape, dimensions);

  const [accounts, setAccounts] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState({
    accounts: true,
    specializations: false,
    submit: false,
  });

  useEffect(() => {
    FetchAccountRequest().then(res => {
      if (res.success) {
        setAccounts(
          res.accounts.map(a => ({label: a.account_name, value: a.account_id})),
        );
      } else {
        showToast('Failed to load account options', 'error');
      }
      setLoading(p => ({...p, accounts: false}));
    });
  }, []);

  const fetchSpecializations = async accountId => {
    if (!accountId) {
      return;
    }
    setLoading(p => ({...p, specializations: true}));
    try {
      const res = await FetchSpecializationsRequest(accountId);
      setSpecializations(
        res.success
          ? res.specializations.map(s => ({
              label: s.specialization_name,
              value: s.specialization_id,
            }))
          : [],
      );
    } catch (e) {
      showToast('Failed to load specializations', 'error');
    } finally {
      setLoading(p => ({...p, specializations: false}));
    }
  };

  const onSubmit = async (values, {resetForm}) => {
    setLoading(p => ({...p, submit: true}));
    try {
      const payload = {
        first_name: values.firstName,
        last_name: values.lastName,
        specialization_id: values.specialization,
        mobile_number: values.mobileNumber,
        phone_number: values.phoneNumber,
        email: values.email.toLowerCase(),
        created_by: 'Receptionist',
      };
      const data = await SignUpRequest(payload);
      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }
      showToast('Doctor registered successfully!', 'success');
      resetForm();
      setTimeout(
        () =>
          navigation.navigate('DoctorClinicNavigator', {
            screen: 'AddProfilePicture',
            params: {doctor_id: data.doctor_id},
          }),
        2000,
      );
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
    } finally {
      setLoading(p => ({...p, submit: false}));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          mobileNumber: '',
          phoneNumber: '',
          email: '',
          account: '',
          specialization: '',
        }}
        validationSchema={SignUpValidationSchema}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            {loading.accounts ? (
              <ActivityIndicator />
            ) : (
              <Dropdown
                data={accounts}
                labelField="label"
                valueField="value"
                placeholder="Select Account"
                value={values.account}
                onChange={item => {
                  setFieldValue('account', item.value);
                  setFieldValue('specialization', '');
                  fetchSpecializations(item.value);
                }}
                style={[
                  styles.dropdown,
                  !values.account && styles.disabledDropdown,
                  !values.account && touched.account && errors.account
                    ? styles.errorBorder
                    : null,
                ]}
              />
            )}

            {loading.specializations ? (
              <ActivityIndicator />
            ) : (
              <Dropdown
                data={specializations}
                labelField="label"
                valueField="value"
                placeholder="Select Specialization"
                value={values.specialization}
                disabled={!values.account}
                onChange={item => setFieldValue('specialization', item.value)}
                style={[
                  styles.dropdown,
                  !values.account && styles.disabledDropdown,
                  !values.specialization &&
                  touched.specialization &&
                  errors.specialization
                    ? styles.errorBorder
                    : null,
                ]}
              />
            )}

            <TextInput
              placeholder="First Name *"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              style={[
                styles.input,
                touched.firstName && errors.firstName
                  ? styles.errorBorder
                  : null,
              ]}
              maxLength={50}
            />

            <TextInput
              placeholder="Last Name *"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              style={[
                styles.input,
                touched.lastName && errors.lastName ? styles.errorBorder : null,
              ]}
              maxLength={50}
            />
            <TextInput
              placeholder="Mobile Number *"
              keyboardType="phone-pad"
              value={values.mobileNumber}
              onChangeText={text =>
                setFieldValue(
                  'mobileNumber',
                  text.replace(/[^0-9]/g, '').slice(0, 10),
                )
              }
              onBlur={handleBlur('mobileNumber')}
              maxLength={10}
              style={[
                styles.input,
                touched.mobileNumber && errors.mobileNumber
                  ? styles.errorBorder
                  : null,
              ]}
            />
            {/* {touched.mobileNumber && errors.mobileNumber && <Text style={}>{errors.mobileNumber}</Text>} */}

            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={values.phoneNumber}
              onChangeText={text =>
                setFieldValue(
                  'phoneNumber',
                  text.replace(/[^0-9]/g, '').slice(0, 10),
                )
              }
              maxLength={10}
              style={[
                styles.input,
                touched.phoneNumber && errors.phoneNumber
                  ? styles.errorBorder
                  : null,
              ]}
            />

            <TextInput
              placeholder="Email *"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              style={[
                styles.input,
                touched.email && errors.email ? styles.errorBorder : null,
              ]}
            />

            <TouchableOpacity
              style={[styles.button, loading.submit && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading.submit}>
              <Text style={styles.buttonText}>
                {loading.submit ? 'Submitting...' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignUpScreen;
