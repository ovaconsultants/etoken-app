import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {styles} from './PatientInfoEditorReceptionScreen.styles';
import {UpdatePatientRequest} from '../../services/patientService';
import {UpdateTokenRequest} from '../../services/tokenService';
import {SaveAll, CircleX} from 'lucide-react-native';

// Validation schema
const validationSchema = yup.object().shape({
  patient: yup.object().shape({
    fname: yup.string().required('First name is required'),
    lname: yup.string().required('Last name is required'),
    age: yup.number().typeError('Must be a number').min(0, 'Cannot be negative'),
    mobile_number: yup
      .string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number'),
    email: yup.string().email('Invalid email format'),
  }),
  token: yup.object().shape({
    status: yup.string().required('Status is required'),
    fee_status: yup.string().required('Payment status is required'),
    fee_amount: yup
      .number()
      .typeError('Must be a number')
      .min(0, 'Cannot be negative'),
    emergency: yup.boolean(),
  }),
});

export const PatientInfoEditorScreen = ({route, navigation}) => {
  const {patientInfo} = route.params;
console.log('patientInfo in PatientInfoEditorScreen:' , patientInfo);
  useEffect(() => {
    navigation.setOptions({
      title: `Edit Token No ${patientInfo.token_no} `,
    });
  }, [navigation, patientInfo.token_no]);

  // Initial form values
  const initialValues = {
    patient: {
      patient_id: patientInfo.patient_id,
      fname: patientInfo.patient_name.split(' ')[0] || '',
      lname: patientInfo.patient_name.split(' ').slice(1).join(' ') || '',
      age : patientInfo.age,
      mobile_number: patientInfo.mobile_number,
      email: patientInfo.email || '',
      modified_by: 'receptionist',
    },
    token: {
      token_id: patientInfo.token_id,
      status: patientInfo.status,
      fee_status: patientInfo.fee_status,
      emergency: patientInfo.emergency === 'Y',
      fee_amount: patientInfo.fee_amount,
      modified_by: 'receptionist',
    },
  };

  // Only submit if there are changes
  const handleSubmit = async (values, {setSubmitting}) => {
    try {
      const patientChanged = Object.keys(values.patient).some(
        key => initialValues.patient[key] !== values.patient[key],
      );

      const tokenChanged = Object.keys(values.token).some(
        key => initialValues.token[key] !== values.token[key],
      );

      if (!patientChanged && !tokenChanged) {
        Alert.alert('Info', 'No changes detected');
        navigation.goBack();
        return;
      }

      const requests = [];

      if (patientChanged) {
        const patientUpdate = {
          ...values.patient,
          patient_name:
            `${values.patient.fname} ${values.patient.lname}`.trim(),
        };
        requests.push(UpdatePatientRequest(patientUpdate));
      }

      if (tokenChanged) {
        const tokenUpdate = {
          ...values.token,
          emergency: values.token.emergency ? 'Y' : 'N',
        };
        requests.push(UpdateTokenRequest(tokenUpdate));
      }

      await Promise.all(requests);
      Alert.alert('Success', 'Information updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating:', error);
      Alert.alert('Error', 'Failed to update information. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit: formikHandleSubmit,
        values,
        setFieldValue,
        errors,
        touched,
        isSubmitting,
      }) => (
        <ScrollView contentContainerStyle={styles.container}>
          {/* Personal Information Section */}
          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name:</Text>
              <TextInput
                style={styles.input}
                value={values.patient.fname}
                onChangeText={handleChange('patient.fname')}
                onBlur={handleBlur('patient.fname')}
                placeholder="First Name"
              />
              {touched.patient?.fname && errors.patient?.fname && (
                <Text style={styles.errorText}>{errors.patient.fname}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name:</Text>
              <TextInput
                style={styles.input}
                value={values.patient.lname}
                onChangeText={handleChange('patient.lname')}
                onBlur={handleBlur('patient.lname')}
                placeholder="Last Name"
              />
              {touched.patient?.lname && errors.patient?.lname && (
                <Text style={styles.errorText}>{errors.patient.lname}</Text>
              )}
            </View>
               <View style={styles.inputContainer}>
              <Text style={styles.label}>Age:</Text>
              <TextInput
                style={styles.input}
                value={values.patient.age}
                onChangeText={handleChange('patient.age')}
                onBlur={handleBlur('patient.age')}
                placeholder="Age "
                keyboardType="phone-pad"
              />
              {touched.patient?.age &&
                errors.patient?.age && (
                  <Text style={styles.errorText}>
                    {errors.patient.age}
                  </Text>
                )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mobile Number:</Text>
              <TextInput
                style={styles.input}
                value={values.patient.mobile_number}
                onChangeText={handleChange('patient.mobile_number')}
                onBlur={handleBlur('patient.mobile_number')}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
              />
              {touched.patient?.mobile_number &&
                errors.patient?.mobile_number && (
                  <Text style={styles.errorText}>
                    {errors.patient.mobile_number}
                  </Text>
                )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={values.patient.email}
                onChangeText={handleChange('patient.email')}
                onBlur={handleBlur('patient.email')}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.patient?.email && errors.patient?.email && (
                <Text style={styles.errorText}>{errors.patient.email}</Text>
              )}
            </View>
          </View>

          {/* Medical Information Section */}
          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>On Hold Status:</Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Switch
                  value={values.token.status === 'On Hold'}
                  onValueChange={isOnHold => {
                    setFieldValue(
                      'token.status',
                      isOnHold ? 'On Hold' : 'Waiting',
                    );
                  }}
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={
                    values.token.status === 'On Hold' ? '#f5dd4b' : '#f4f3f4'
                  }
                />
                <Text style={{fontWeight: 'bold'}}>
                  {values.token.status === 'On Hold'
                    ? 'ON HOLD'
                    : 'ACTIVE (Waiting)'}
                </Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Emergency:</Text>

              <Switch
                value={values.token.emergency}
                onValueChange={value => setFieldValue('token.emergency', value)}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={values.token.emergency ? '#007BFF' : '#f4f3f4'}
              />
              <Text style={{}}>{values.token.emergency ? 'Yes' : 'No'}</Text>
            </View>
          </View>

          {/* Payment Information Section */}
          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Payment Status:</Text>
              <Switch
                value={values.token.fee_status === 'Paid'}
                onValueChange={value => {
                  Alert.alert(
                    'Change Payment Status',
                    `Are you sure you want to change payment status to ${
                      value ? 'Paid' : 'Not Paid'
                    }?`,
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => {
                          // Revert the switch visually if cancelled
                          setFieldValue(
                            'token.fee_status',
                            values.token.fee_status,
                          );
                        },
                      },
                      {
                        text: 'Confirm',
                        onPress: () => {
                          setFieldValue(
                            'token.fee_status',
                            value ? 'Paid' : 'Not Paid',
                          );
                        },
                      },
                    ],
                  );
                }}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={
                  values.token.fee_status === 'Paid' ? '#007BFF' : '#f4f3f4'
                }
              />
              <Text style={styles.toggleText}>
                {values.token.fee_status === 'Paid' ? 'Paid' : 'Not Paid'}
              </Text>
              {touched.token?.fee_status && errors.token?.fee_status && (
                <Text style={styles.errorText}>{errors.token.fee_status}</Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={formikHandleSubmit}
              style={styles.saveButton}
              disabled={isSubmitting}>
              <SaveAll size={20} color="#fff" />
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Saving...' : 'Save All'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeButton}
              disabled={isSubmitting}>
              <CircleX size={20} color="#fff" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};
