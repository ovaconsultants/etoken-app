import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {Formik} from 'formik';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {Users, Home} from 'lucide-react-native';
import {patientsAtom} from '../../atoms/patientAtoms/patientAtom';
import styles from './ReceptionScreen.styles';
import {ReceptionFormValidationSchema} from '../../utils/ReceptionFormValidation';
import {
  FetchPatientsRequest,
  InsertPatientRequest,
} from '../../services/patientService';
import {GenerateTokenRequest} from '../../services/tokenService';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import SearchBar from '../../components/searchBar/SearchBar';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import FooterNavigation from '../../components/tabNavigationFooter/TabNavigationFooter';
import {
  showToast,
  ToastMessage,
} from '../../components/toastMessage/ToastMessage';

const formFields = [
  {
    name: 'patient_name',
    placeholder: 'Full Name',
    keyboardType: 'default',
    autoCapitalize: 'words',
  },
  {
    name: 'mobile_number',
    placeholder: 'Mobile Number',
    keyboardType: 'phone-pad',
    maxLength: 10,
  },
  {
    name: 'area',
    placeholder: 'Locality/Area',
    keyboardType: 'default',
  },
  {
    name: 'email',
    placeholder: 'Email',
    keyboardType: 'email-address',
  },
];

const ReceptionScreen = ({
  route: {
    params: {doctor_id, clinic_id},
  },
}) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [patients, setPatients] = useAtom(patientsAtom);
  const formikRef = useRef();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const {isLoading, isError, error} = useQuery({
    queryKey: ['fetchingPatients'],
    queryFn: async () => {
      const data = await FetchPatientsRequest();
      setPatients(data);
      return data;
    },
    refetchInterval: 10 * 1000,
    staleTime: 10 * 1000,
  });

  const handleSubmit = async (values, {resetForm}) => {
    try {
      setSubmitAttempted(true);

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
      setSubmitAttempted(false);
      queryClient.invalidateQueries(['fetchingPatients']);

      const token_no = await GenerateTokenRequest({
        patient_id: patientIdToUse,
        doctor_id,
        clinic_id,
        created_by: 'receptionist',
      });

      showToast('Token Generated successfully!');
      navigation.navigate('TokenSuccess', {
        tokenNumber: token_no,
        patientName: values.patient_name,
        patientId: patientIdToUse,
      });
    } catch (err) {
      showToast(err.message ?? 'An error occurred.', 'error');
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <LoadingErrorHandler {...{isLoading, isError, error}} />
          <ToastMessage />

          {!isLoading && !isError && (
            <>
              <View style={styles.searchBarContainer}>
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
              </View>

              <Formik
                innerRef={formikRef}
                initialValues={Object.fromEntries(
                  formFields.map(f => [f.name, '']),
                )}
                validationSchema={ReceptionFormValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit: formikHandleSubmit,
                  values,
                  errors,
                  touched,
                  resetForm,
                  isValid,
                  setFieldTouched,
                }) => {
                  const isFormIncomplete = formFields.some(
                    field => !values[field.name]?.trim() || errors[field.name],
                  );

                  const shouldShowError = fieldName => {
                    return (
                      (submitAttempted || touched[fieldName]) &&
                      errors[fieldName]
                    );
                  };

                  return (
                    <View style={styles.formContainer}>
                      {formFields.map(field => (
                        <View key={field.name} style={styles.inputContainer}>
                          <TextInput
                            style={[
                              styles.input,
                              shouldShowError(field.name) && styles.inputError,
                            ]}
                            placeholder={field.placeholder}
                            placeholderTextColor="#888"
                            onChangeText={text => {
                              handleChange(field.name)(text);
                              setFieldTouched(field.name, true, false);
                            }}
                            onBlur={() =>
                              setFieldTouched(field.name, true, false)
                            }
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
                          onPress={() => {
                            resetForm();
                            formFields.forEach(field => {
                              setFieldTouched(field.name, false);
                            });
                            setSubmitAttempted(false);
                          }}>
                          <Text style={styles.clearButtonText}>Clear</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.submitButton,
                            isFormIncomplete && styles.disabledButton,
                          ]}
                          onPress={() => {
                            if (!isFormIncomplete) {
                              formikHandleSubmit();
                            } else {
                              // Mark all fields as touched when submit is attempted
                              formFields.forEach(field => {
                                setFieldTouched(field.name, true, false);
                              });
                            }
                          }}
                          disabled={isFormIncomplete}>
                          <Text style={styles.buttonText}>GO</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
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
                  params: {doctor_id, clinic_id},
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
