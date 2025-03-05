import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {styles} from './receptionScreen.styles';
import {
  insertPatient,
  fetchPatients,
  generateNewToken,
} from '../../services/authService';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {searchTermAtom, patientsAtom} from '../../atoms/patientAtoms/atom';
import GenerateTokenScreen from '../generateToken/GenerateTokenScreen';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PatientSchema = Yup.object().shape({
  patient_name: Yup.string().trim().required('Patient Name is required'),
  mobile_number: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile Number')
    .required('Mobile Number is required'),
  email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid Email')
    .required('Email is required'),
});

const ReceptionScreenComponent = ({ route }) => {
  const { clinic_id } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [generatedToken, setGeneratedToken] = useState(null);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [patients, setPatients] = useAtom(patientsAtom);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const formikRef = useRef();

  const {isLoading, isError, error} = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const patients = await fetchPatients();
      setPatients(patients);
      return patients;
    },
    refetchInterval: 10 * 1000,
    staleTime: 10 * 1000,
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const patientData = {
        patient_name: values.patient_name.trim(),
        mobile_number: values.mobile_number.trim(),
        email: values.email.trim().toLowerCase(),
        clinic_id: clinic_id, // Include clinic_id from route params
        created_by: 'receptionist', // Assuming this is static
      };
  
      const response = await insertPatient(patientData);
      if (response?.success) {
        resetForm();
        queryClient.invalidateQueries(['patients']); // Refresh patient list
        handleGenerateToken({
          ...values,
          patient_id: response.patient_id,
        });
      } else {
        Alert.alert('Error', response?.message ?? 'Failed to insert patient.');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.message ?? 'An error occurred while inserting the patient.',
      );
    }
  };

  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.patient_name?.toLowerCase().includes(searchLower) ||
      patient.mobile_number?.includes(searchTerm) ||
      patient.email?.toLowerCase().includes(searchLower)
    );
  });

  const handlePatientSelect = patient => {
    console.log('selected Patient ', patient);
    setSearchTerm(patient.patient_name);
    setDropdownVisible(false);

    if (formikRef.current) {
      formikRef.current.setValues({
        patient_id: patient.patient_id,
        patient_name: patient.patient_name,
        mobile_number: patient.mobile_number,
        email: patient.email,
      });

      // Ensure the form updates correctly and clears errors if any
      formikRef.current.validateForm();
    }
  };

  const handleGenerateToken = async values => {
    console.log('This is the patient id ', values.patient_id);
    try {
      const response = await generateNewToken(values.patient_id);
      console.log('response for token generation', response);
      if (response?.success) {
        setGeneratedToken(response.token_no);
        setIsModalVisible(true); // Ensure modal opens when token is generated
      } else {
        Alert.alert('Error', response?.message || 'Failed to generate token.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while generating the token.');
    }
  };

  if (isLoading) return <Text>Loading patients...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDropdownVisible(false);
        setSearchTerm('');
        Keyboard.dismiss();
      }}
      accessible={false}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBoxContainer}>
            {/* <Icon
              name="search"
              size={24}
              color="#007AFF"
              style={styles.searchIcon}
            /> */}
            <TextInput
              style={styles.searchBox}
              placeholder="Search by Patient, Mobile, or Email"
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={text => {
                setSearchTerm(text);
                setDropdownVisible(!!text);
              }}
            />
          </View>

          {dropdownVisible && searchTerm.length > 0 && (
            <FlatList
              data={filteredPatients}
              keyExtractor={item => item.patient_id.toString()}
              style={styles.dropdown}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handlePatientSelect(item)}>
                  <Text style={styles.dropdownItemText}>
                    {item.patient_name} - {item.mobile_number}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <View style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>No patients found</Text>
                </View>
              )}
            />
          )}
        </View>

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
            handleSubmit,
            values,
            errors,
            touched,
            resetForm,
          }) => (
            <View>
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
                  style={[styles.button, styles.clearButton]}
                  onPress={resetForm}>
                  <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>GO</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.viewAllButtonContainer}>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('PatientScreen', {clinic_id : clinic_id})}>
            <Text style={styles.viewAllButtonText}>View All Patients</Text>
          </TouchableOpacity>
        </View>

        <GenerateTokenScreen
          tokenNumber={generatedToken}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const queryClient = new QueryClient();
const ReceptionScreen = ({ route }) => (
  <QueryClientProvider client={queryClient}>
    <ReceptionScreenComponent route={route} />
  </QueryClientProvider>
);

export default ReceptionScreen;
