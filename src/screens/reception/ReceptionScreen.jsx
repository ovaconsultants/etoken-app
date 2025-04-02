import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { Users, Home } from 'lucide-react-native';
import { patientsAtom } from '../../atoms/patientAtoms/patientAtom';
import { styles } from './ReceptionScreen.styles';
import { ReceptionFormValidationSchema } from '../../utils/ReceptionFormValidation';
import {
  FetchPatientsRequest,
  InsertPatientRequest,
} from '../../services/patientService';
import { GenerateTokenRequest } from '../../services/tokenService';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import SearchBar from '../../components/searchBar/SearchBar';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import FooterNavigation from '../../components/tabNavigationFooter/TabNavigationFooter';

const formFields = [
  {
    name: 'patient_name',
    placeholder: 'Full Name (e.g., John Doe)',
    keyboardType: 'default',
    autoCapitalize: 'words',
  },
  {
    name: 'mobile_number',
    placeholder: 'Mobile Number (e.g., 9876543210)',
    keyboardType: 'phone-pad',
    maxLength: 10,
  },
  {
    name: 'area',
    placeholder: 'Locality/Area (e.g., Downtown)',
    keyboardType: 'default',
  },
  {
    name: 'email',
    placeholder: 'Email (e.g., john@example.com)',
    keyboardType: 'email-address',
  },
];

const ReceptionScreen = ({
  route: {
    params: { doctor_id, clinic_id },
  },
}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [patients, setPatients] = useAtom(patientsAtom);
  const formikRef = useRef();

  const { isLoading, isError, error } = useQuery({
    queryKey: ['fetchingPatients'],
    queryFn: async () => {
      const data = await FetchPatientsRequest();
      setPatients(data);
      return data;
    },
    refetchInterval: 10 * 1000,
    staleTime: 10 * 1000,
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const existingPatient = patients.find(
        p =>
          p.mobile_number === values.mobile_number.trim() ||
          p.email === values.email.trim().toLowerCase(),
      );

      const patientIdToUse =
        existingPatient?.patient_id ||
        (await InsertPatientRequest({
          ...Object.fromEntries(
            Object.entries(values).map(([k, v]) => [
              k,
              typeof v === 'string' ? v.trim() : v,
            ]),
          ),
          clinic_id,
          doctor_id,
          created_by: 'receptionist',
        }));

      if (!patientIdToUse) {
        throw new Error('Failed to insert patient or generate token');
      }

      resetForm();
      queryClient.invalidateQueries(['fetchingPatients']);
      const token_no = await GenerateTokenRequest({
        patient_id: patientIdToUse,
        doctor_id,
        clinic_id,
        created_by: 'receptionist',
      });
      navigation.navigate('TokenSuccess', {
        tokenNumber: token_no,
        patientName: values.patient_name,
        patientId: patientIdToUse,
      });
    } catch (err) {
      Alert.alert('Error', err.message ?? 'An error occurred.');
    }
  };

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <LoadingErrorHandler {...{ isLoading, isError, error }} />

          {!isLoading && !isError && (
            <>
              <SearchBar
                data={patients}
                onSelectItem={patient =>
                  formikRef.current?.setValues({
                    patient_id: patient.patient_id,
                    ...Object.fromEntries(
                      ['patient_name', 'mobile_number', 'area', 'email'].map(
                        key => [key, patient[key]],
                      ),
                    ),
                  })
                }
                placeholder="Search by Patient, Mobile, or Email"
              />

              <Formik
                innerRef={formikRef}
                initialValues={Object.fromEntries(
                  formFields.map(f => [f.name, '']),
                )}
                validationSchema={ReceptionFormValidationSchema}
                onSubmit={handleSubmit}
              >
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
                    {formFields.map(field => (
                      <View key={field.name} style={styles.inputContainer}>
                        {touched[field.name] && errors[field.name] && (
                          <Text style={styles.errorText}>
                            {errors[field.name]}
                          </Text>
                        )}
                        <TextInput
                          style={[
                            styles.input,
                            touched[field.name] && errors[field.name] && styles.inputError,
                          ]}
                          placeholder={field.placeholder}
                          placeholderTextColor="#888"
                          onChangeText={handleChange(field.name)}
                          onBlur={handleBlur(field.name)}
                          value={values[field.name]}
                          keyboardType={field.keyboardType}
                          autoCapitalize={field.autoCapitalize || 'none'}
                          maxLength={field.maxLength}
                        />
                      </View>
                    ))}

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.clearButton}
                        onPress={resetForm}
                      >
                        <Text style={styles.clearButtonText}>Clear</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.submitButton}
                        onPress={formikHandleSubmit}
                      >
                        <Text style={styles.buttonText}>GO</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </>
          )}

          <View style={styles.footerNavigation}>
            <FooterNavigation
              navigation={navigation}
              currentRoute="Reception"
              routes={[
                {
                  id: 'home',
                  icon: Home,
                  screen: 'Home',
                  label: 'Home',
                },
                {
                  id: 'tokens',
                  icon: Users,
                  label: 'Tokens',
                  screen: 'TokenListing',
                  params: { doctor_id, clinic_id },
                },
              ]}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default withQueryClientProvider(ReceptionScreen);