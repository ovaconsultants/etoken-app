import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import {styles} from './ReceptionScreen.styles';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../../components/searchBar/SearchBar';
import LoadingErrorHandler from '../../components/LoadingErrorHandler';
import {PatientSchema} from '../../utils/formFields/validationSchemas/clinicSchemas';
import {
  FetchPatientsRequest,
  InsertPatientRequest,
} from '../../services/patientService';
import {GenerateTokenRequest} from '../../services/tokenService';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import {Users, Home} from 'lucide-react-native';

const ReceptionScreen = ({route}) => {
  const {doctor_id, clinic_id} = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [patients, setPatients] = useState(null);
  const formikRef = useRef();

  const {isLoading, isError, error} = useQuery({
    queryKey: ['patientsForToken'],
    queryFn: async () => {
      const fetchedPatients = await FetchPatientsRequest();
      setPatients(fetchedPatients);
      return fetchedPatients;
    },
    refetchInterval: 10 * 1000,
    staleTime: 10 * 1000,
  });

  const handleSubmit = async (values, {resetForm}) => {
    try {
      const existingPatient = patients.find(
        patient =>
          patient.mobile_number === values.mobile_number.trim() ||
          patient.email === values.email.trim().toLowerCase(),
      );

      let patientIdToUse;

      if (existingPatient) {
        patientIdToUse = existingPatient.patient_id;
      } else {
        const patientData = {
          patient_name: values.patient_name.trim(),
          mobile_number: values.mobile_number.trim(),
          email: values.email.trim().toLowerCase(),
          clinic_id: clinic_id,
          created_by: 'receptionist',
        };

        const generatedPatientId = await InsertPatientRequest(patientData);
        patientIdToUse = generatedPatientId;
      }

      if (patientIdToUse) {
        resetForm();
        queryClient.invalidateQueries(['patients']);

        const patientTokenDataObj = {
          patient_id: patientIdToUse,
          doctor_id: doctor_id,
          clinic_id: clinic_id,
          created_by: 'receptionist',
        };

        const token_no = await GenerateTokenRequest(patientTokenDataObj);

        navigation.navigate('TokenSuccess', {
          tokenNumber: token_no,
          patientName: values.patient_name,
          patientId: patientIdToUse,
        });
      } else {
        Alert.alert('Error', 'Failed to insert patient or generate token.');
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', err.message ?? 'An error occurred.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <LoadingErrorHandler
          isLoading={isLoading}
          isError={isError}
          error={error}
        />

        {!isLoading && !isError && (
          <>
            <SearchBar
              data={patients}
              onSelectItem={patient => {
                if (formikRef.current) {
                  formikRef.current.setValues({
                    patient_id: patient.patient_id,
                    patient_name: patient.patient_name,
                    mobile_number: patient.mobile_number,
                    email: patient.email,
                  });
                }
              }}
              placeholder="Search by Patient, Mobile, or Email"
            />

            <Formik
              innerRef={formikRef}
              initialValues={{
                patient_id: '',
                patient_name: '',
                mobile_number: '',
                email: '',
              }}
              validationSchema={PatientSchema}
              onSubmit={handleSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit: formikHandleSubmit,
                values,
                errors,
                touched,
                resetForm,
              }) => (
                <View style={styles.formContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Patient Name"
                    placeholderTextColor="#888"
                    onChangeText={handleChange('patient_name')}
                    onBlur={handleBlur('patient_name')}
                    value={values.patient_name}
                  />
                  {touched.patient_name && errors.patient_name && (
                    <Text style={styles.errorText}>{errors.patient_name}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    placeholderTextColor="#888"
                    onChangeText={handleChange('mobile_number')}
                    onBlur={handleBlur('mobile_number')}
                    value={values.mobile_number}
                    keyboardType="phone-pad"
                  />
                  {touched.mobile_number && errors.mobile_number && (
                    <Text style={styles.errorText}>{errors.mobile_number}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={resetForm}>
                      <Text style={styles.buttonText}>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={formikHandleSubmit}>
                      <Text style={styles.buttonText}>GO</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </>
        )}

        <FooterNavigation
          navigation={navigation}
          doctor_id={doctor_id}
          clinic_id={clinic_id}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default withQueryClientProvider(ReceptionScreen);

const FooterNavigation = ({navigation, doctor_id, clinic_id}) => {
  return (
    <View style={styles.footerNavigation}>
      <FooterButton icon={Home} onPress={() => navigation.navigate('Home')} />
      <FooterButton
        icon={Users}
        onPress={() =>
          navigation.navigate('TokenListing', {doctor_id, clinic_id})
        }
      />
    </View>
  );
};

const FooterButton = ({icon: Icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.footerButton} onPress={onPress}>
      <Icon size={24} color="#333" />
    </TouchableOpacity>
  );
};
