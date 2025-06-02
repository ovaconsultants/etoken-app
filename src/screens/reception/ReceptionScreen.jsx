import React, {useRef, useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {Users, Home, Eraser, RefreshCcw} from 'lucide-react-native';

import {patientsAtom} from '../../atoms/patientAtoms/patientAtom';
import {ReceptionFormValidationSchema} from '../../utils/ReceptionFormValidation';
import {
  FetchPatientsRequest,
  InsertPatientRequest,
} from '../../services/patientService';
import {GenerateTokenRequest} from '../../services/tokenService';
import {
  UploadPatientProfileImageRequest,
  GetPatientProfileImageRequest,
} from '../../services/profileImageService';

import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import SearchBar from '../../components/searchBar/SearchBar';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import FooterNavigation from '../../components/tabNavigationFooter/TabNavigationFooter';
import CapturePatientProfilePhotoScreen from '../profilePicture/patient/CapturePatientProfilePhotoScreen';

import {showToast} from '../../components/toastMessage/ToastMessage';
import {globalStyles} from '../../styles/globalStyles';
import {useOrientation} from '../../hooks/useOrientation';
import {createStyles} from './ReceptionScreen.styles';

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
    name: 'age',
    placeholder: 'Age',
    keyboardType: 'default',
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

export const ReceptionScreen = ({route}) => {
  const {doctor_id = null, clinic_id = null} = route.params ?? {};
  const {isLandscape, dimensions} = useOrientation();
  const styles = useMemo(
    () => createStyles(isLandscape, dimensions),
    [dimensions, isLandscape],
  );

  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const formikRef = useRef();

  const [patients, setPatients] = useAtom(patientsAtom);
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const {isLoading, isError, error} = useQuery({
    queryKey: ['fetchingPatients'],
    queryFn: async () => {
      const data = await FetchPatientsRequest(doctor_id);
      setPatients(data);
      return data;
    },
    refetchInterval: 10 * 1000,
    staleTime: 11 * 1000,
  });

  useEffect(() => {
    setProfileImage(null);
  }, [doctor_id, clinic_id]);
  const handleSubmit = async values => {
    try {
      const patientIdToUse =
        values?.patient_id ||
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

      setSearchDropdownVisible(false);
      // Only upload if we have a new camera image
      if (profileImage && typeof profileImage !== 'string') {
        try {
          await UploadPatientProfileImageRequest(
            profileImage,
            doctor_id,
            patientIdToUse,
          );
          await GetPatientProfileImageRequest(doctor_id, patientIdToUse);
        } catch (uploadError) {
          console.warn('Profile image upload failed:', uploadError);
        }
      }
      handleClear();
      queryClient.invalidateQueries(['fetchingPatients']);
      showToast('Token generated successfully', 'success');
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
      showToast(err.message ?? 'An error occurred.', 'error');
    }
  };

  const handleClear = () => {
    formikRef.current?.resetForm();
    formFields.forEach(field => {
      formikRef.current?.setFieldTouched(field.name, false);
    });
    console.log('value of profile image before clearing:', profileImage);
    setProfileImage(null);
  };
  const handleRefresh = async () => {
    setIsLoadingPatients(true);
    queryClient.invalidateQueries(['fetchingPatients']);
    await queryClient.refetchQueries(['fetchingPatients']);
    formikRef.current?.resetForm();
    setIsLoadingPatients(false);
  };

  if (isLoading || isLoadingPatients) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <LoadingErrorHandler
            isLoading={isLoadingPatients || isLoading}
            isLandscape={isLandscape}
            isError={isError}
            error={error}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback
        onPress={() => {
          setSearchDropdownVisible(false);
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <LoadingErrorHandler {...{isLoading, isError, error, isLandscape}} />

          {!isLoading && !isError && (
            <View style={styles.contentContainer}>
              <View style={styles.searchBarContainer}>
                <SearchBar
                  data={patients}
                  onSelectItem={patient =>
                    formikRef.current?.setValues({
                      patient_id: patient.patient_id,
                      ...Object.fromEntries(
                        formFields.map(field => [
                          field.name,
                          patient[field.name]?.toString() ?? '',
                        ]),
                      ),
                    })
                  }
                  onSelectImageUrl={imageUrl => {
                    if (!profileImage) {
                      setProfileImage(imageUrl);
                    }
                  }}
                  dropdownVisible={searchDropdownVisible}
                  setDropdownVisible={setSearchDropdownVisible}
                  placeholder="Search by Patient Name, Mobile, or Email"
                  doctorId={doctor_id}
                />
              </View>
              {/* Simplified Image Capture Section */}
              <View style={styles.profileUploadLink}>
                {profileImage ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image
                      source={{uri: profileImage.uri || profileImage}}
                      style={styles.profileImagePreview}
                    />
                    <TouchableOpacity
                      style={styles.changePhotoButton}
                      onPress={() => setProfileImage(null)}>
                      <Text style={styles.changePhotoText}>Change Photo</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <CapturePatientProfilePhotoScreen
                    onImageSelected={imageData => {
                      setProfileImage(imageData);
                    }}
                  />
                )}
              </View>
              <Formik
                innerRef={formikRef}
                initialValues={Object.fromEntries(
                  formFields.map(f => [f.name, f.name === 'age' ? null : '']),
                )}
                validationSchema={ReceptionFormValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
                validateOnBlur
                validateOnChange>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isValid,
                }) => (
                  <View style={styles.formContainer}>
                    <View style={styles.inputsWrapper}>
                      {formFields.map(field => (
                        <View key={field.name} style={styles.inputContainer}>
                          <TextInput
                            style={[
                              styles.input,
                              touched[field.name] &&
                                errors[field.name] &&
                                styles.inputError,
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
                    </View>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[
                          styles.submitButton,
                          !isValid && globalStyles.disabledButton,
                        ]}
                        onPress={handleSubmit}
                        disabled={!isValid}>
                        <Text style={styles.buttonText}>GO</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          )}

          <View style={styles.footerContainer}>
            <FooterNavigation
              navigation={navigation}
              currentRoute="Reception"
              handleRefresh={handleRefresh}
              handleClear={handleClear}
              routes={[
                {
                  id: 'home',
                  icon: Home,
                  screen: 'Home',
                  label: 'Home',
                },
                {
                  id: 'refresh',
                  icon: RefreshCcw,
                  label: 'refresh',
                  action: 'refresh',
                },
                {
                  id: 'clear',
                  icon: Eraser,
                  label: 'Clear',
                  action: 'clear',
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
