import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import {useAtomValue} from 'jotai';
import {doctorInfoAtom} from '../../atoms/doctorAtoms/doctorAtom';
import {UpdateDoctorProfileDetailsRequest} from '../../services/doctorService';
import * as yup from 'yup';
import {Formik} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from '@react-navigation/native';
import { useOrientation } from '../../hooks/useOrientation';
import { createStyles } from './DoctorEditor.styles';


// Validation Schema
const doctorProfileSchema = yup.object().shape({
  doctorName: yup.string().required('Full name is required'),
  mobileNumber: yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits'),
  phoneNumber: yup.string(),
  gender: yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender'),
  dateOfBirth: yup.date().max(new Date(), 'Date cannot be in future'),
  qualification: yup.string(),
  experienceYears: yup
    .number()
    .min(0, 'Cannot be negative')
    .max(50, 'Maximum 50 years'),
  consultationFee: yup.number().min(0, 'Cannot be negative'),
  biography: yup.string().max(500, 'Maximum 500 characters'),
  address: yup.string(),
  registrationNumber: yup.string(),
  specialization: yup.string(),
});

const DoctorEditorScreen = ({navigation}) => {
  const {isLandscape} = useOrientation();
  const styles = createStyles(isLandscape);
  const doctorInfo = useAtomValue(doctorInfoAtom);
  console.log('Doctor Info:', doctorInfo);
  const {colors} = useTheme();
  const [activeSection, setActiveSection] = useState('basic');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const initialValues = {
    doctorName: doctorInfo.doctor_name || '',
    mobileNumber: doctorInfo.mobile_number || '',
    phoneNumber: doctorInfo.phone_number || '',
    gender: doctorInfo.gender || '',
    dateOfBirth: doctorInfo.date_of_birth
      ? new Date(doctorInfo.date_of_birth)
      : null,
    qualification: doctorInfo.qualification || '',
    experienceYears: doctorInfo.experience_years || '',
    consultationFee: doctorInfo.consultation_fee || '',
    biography: doctorInfo.biography || '',
    address: doctorInfo.address || '',
    registrationNumber: doctorInfo.registration_number || '',
    specialization: doctorInfo.specialization_name || '',
    profilePictureUrl: doctorInfo.profile_picture_url || '',
  };

  const handleSubmit = async (values, {setSubmitting}) => {
    try {
      const formattedValues = {
        ...values,
        doctor_id: doctorInfo.doctor_id,
        date_of_birth: values.dateOfBirth
          ? values.dateOfBirth.toISOString().split('T')[0]
          : null,
        modified_by: doctorInfo.doctor_id.toString(),
      };

      const response = await UpdateDoctorProfileDetailsRequest(formattedValues);
      console.log('Update response:', response);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={doctorProfileSchema}
      onSubmit={handleSubmit}
      styles= {styles}>
      {({
        handleChange,
        handleBlur,
        submitForm,
        values,
        errors,
        touched,
        setFieldValue,
        isSubmitting,
      }) => (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.sectionButtons}>
              <TouchableOpacity
                style={[
                  styles.sectionButton,
                  activeSection === 'basic' && styles.activeSectionButton,
                  {borderColor: colors.primary},
                ]}
                onPress={() => setActiveSection('basic')}>
                <Text
                  style={[
                    styles.sectionButtonText,
                    {
                      color:
                        activeSection === 'basic'
                          ? colors.primary
                          : colors.text,
                    },
                  ]}>
                  Basic Info
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sectionButton,
                  activeSection === 'professional' &&
                    styles.activeSectionButton,
                  {borderColor: colors.primary},
                ]}
                onPress={() => setActiveSection('professional')}>
                <Text
                  style={[
                    styles.sectionButtonText,
                    {
                      color:
                        activeSection === 'professional'
                          ? colors.primary
                          : colors.text,
                    },
                  ]}>
                  Professional
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sectionButton,
                  activeSection === 'contact' && styles.activeSectionButton,
                  {borderColor: colors.primary},
                ]}
                onPress={() => setActiveSection('contact')}>
                <Text
                  style={[
                    styles.sectionButtonText,
                    {
                      color:
                        activeSection === 'contact'
                          ? colors.primary
                          : colors.text,
                    },
                  ]}>
                  Contact
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              {activeSection === 'basic' && (
                <BasicInfoSection
                  colors={colors}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  setShowDatePicker={setShowDatePicker}
                  navigation={navigation}
                  styles={styles}
                />
              )}

              {activeSection === 'professional' && (
                <ProfessionalInfoSection
                  colors={colors}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  styles={styles}
                />
              )}

              {activeSection === 'contact' && (
                <ContactInfoSection
                  colors={colors}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  styles={styles}
                />
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={values.dateOfBirth || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setFieldValue('dateOfBirth', selectedDate);
                    }
                  }}
                />
              )}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[styles.submitButton, {backgroundColor: colors.primary}]}
            onPress={submitForm}
            disabled={isSubmitting}>
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

// Sub-components for each section
const BasicInfoSection = ({
  colors,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  setShowDatePicker,
  navigation,
  styles
}) => (
  <>
    <View style={styles.sectionHeader}>
      <Pressable
        onPress={() =>
          navigation.navigate('AddProfilePicture', {
            doctor_id: values.doctor_id,
          })
        }>
        <Text style={styles.sectionHeaderText}>change profile picture</Text>
      </Pressable>
    </View>

    <View style={styles.inputGroup}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={values.doctorName}
        onChangeText={handleChange('doctorName')}
        placeholder="Doctor Name"
        onBlur={handleBlur('doctorName')}
      />
      {touched.doctorName && errors.doctorName && (
        <Text style={styles.errorText}>{errors.doctorName}</Text>
      )}
    </View>

    <View style={styles.inputGroup}>
      <Text style={[styles.label, {color: colors.text}]}>Gender</Text>
      <View style={styles.radioGroup}>
        {['Male', 'Female', 'Other'].map(gender => (
          <TouchableOpacity
            key={gender}
            style={[
              styles.radioButton,
              values.gender === gender && {backgroundColor: colors.primary},
              {borderColor: colors.primary},
            ]}
            onPress={() => setFieldValue('gender', gender)}>
            <Text
              style={[
                styles.radioButtonText,
                values.gender === gender && {color: 'white'},
                {color: colors.text},
              ]}>
              {gender}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {touched.gender && errors.gender && (
        <Text style={styles.errorText}>{errors.gender}</Text>
      )}
    </View>

    <View style={styles.inputGroup}>
      <Text style={[styles.label, {color: colors.text}]}>Date of Birth</Text>
      <TouchableOpacity
        style={[
          styles.input,
          styles.dateInput,
          {backgroundColor: colors.card, borderColor: colors.border},
        ]}
        onPress={() => setShowDatePicker(true)}>
        <Text
          style={{
            color: values.dateOfBirth ? colors.text : colors.placeholder,
          }}>
          {values.dateOfBirth
            ? values.dateOfBirth.toLocaleDateString()
            : 'Select date'}
        </Text>
      </TouchableOpacity>
      {touched.dateOfBirth && errors.dateOfBirth && (
        <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
      )}
    </View>
  </>
);

const ProfessionalInfoSection = ({
  colors,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  styles
}) => (
  <>
    <View style={styles.inputGroup}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={values.specialization}
        onChangeText={handleChange('specialization')}
        onBlur={handleBlur('specialization')}
        placeholder="Specialization"
      />
    </View>

    <View style={styles.inputGroup}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={values.qualification}
        onChangeText={handleChange('qualification')}
        onBlur={handleBlur('qualification')}
        placeholder="Qualification"
      />
    </View>

    <View style={styles.inputGroup}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={values.experienceYears.toString()}
        onChangeText={handleChange('experienceYears')}
        onBlur={handleBlur('experienceYears')}
        keyboardType="numeric"
        placeholder="Years of Experience"
      />
      {touched.experienceYears && errors.experienceYears && (
        <Text style={styles.errorText}>{errors.experienceYears}</Text>
      )}
    </View>

    <View style={styles.inputGroup}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={values.consultationFee?.toString()}
        onChangeText={handleChange('consultationFee')}
        onBlur={handleBlur('consultationFee')}
        keyboardType="numeric"
        placeholder="Consultation Fee"
      />
      {touched.consultationFee && errors.consultationFee && (
        <Text style={styles.errorText}>{errors.consultationFee}</Text>
      )}
    </View>

    <View style={styles.inputGroup}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={values.registrationNumber}
        onChangeText={handleChange('registrationNumber')}
        onBlur={handleBlur('registrationNumber')}
        placeholder="Registration Number"
      />
    </View>

    <View style={styles.inputGroup}>
      <TextInput
        style={[
          styles.textArea,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={values.biography}
        onChangeText={handleChange('biography')}
        placeholder="Biography"
        onBlur={handleBlur('biography')}
        multiline
        numberOfLines={4}
      />
      {touched.biography && errors.biography && (
        <Text style={styles.errorText}>{errors.biography}</Text>
      )}
    </View>
  </>
);

const ContactInfoSection = ({
  colors,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  styles
}) => (
  <>
    <View style={styles.inputGroup}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={values.mobileNumber}
        onChangeText={handleChange('mobileNumber')}
        placeholder="Mobile Number"
        onBlur={handleBlur('mobileNumber')}
        keyboardType="phone-pad"
      />
      {touched.mobileNumber && errors.mobileNumber && (
        <Text style={styles.errorText}>{errors.mobileNumber}</Text>
      )}
    </View>

    <View style={styles.inputGroup}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={values.phoneNumber}
        onChangeText={handleChange('phoneNumber')}
        placeholder="Phone Number"
        onBlur={handleBlur('phoneNumber')}
        keyboardType="phone-pad"
      />
    </View>

    <View style={styles.inputGroup}>
      <TextInput
        style={[
          styles.textArea,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        value={values.address}
        onChangeText={handleChange('address')}
        placeholder="Address"
        onBlur={handleBlur('address')}
        multiline
        numberOfLines={3}
      />
    </View>
  </>
);

  
export default DoctorEditorScreen;
