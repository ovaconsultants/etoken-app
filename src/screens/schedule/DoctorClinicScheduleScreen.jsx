import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AddDoctorClinicScheduleRequest} from '../../services/doctorService';
import styles from './DoctorClinicScheduleScreen.styles';
import TimePicker from '../../components/timePicker/TimePicker';
import {Dropdown} from 'react-native-element-dropdown';
import {userTokenAtom} from '../../atoms/authAtoms/authAtom';
import {
  doctorClinicDetailsAtom,
  doctorIdAtom,
} from '../../atoms/doctorAtoms/doctorAtom';
import {useAtomValue, useSetAtom} from 'jotai';
import {WEEK_DAYS} from '../../constants/formComponentsData/weekDaysDropdownData';
import {TransformTimeForPostgres} from '../../utils/formatTimeForPostgres';
import {ScheduleValidationSchema} from '../../utils/formFields/validationSchemas/clinicSchemas';

// ✅ Get unique clinics
const getUniqueClinics = clinics => {
  const uniqueClinics = [];
  const seen = new Set();

  clinics.forEach(clinic => {
    const key = `${clinic.clinic_name}_${clinic.clinic_address}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueClinics.push({
        label: `${clinic.clinic_name} - ${clinic.clinic_address}`,
        value: clinic.clinic_id,
      });
    }
  });

  return uniqueClinics;
};

const DoctorClinicScheduleScreen = ({navigation}) => {
  const setIsAuthenticated = useSetAtom(userTokenAtom);
  const clinic_Data = useAtomValue(doctorClinicDetailsAtom);
  const doctorId = useAtomValue(doctorIdAtom);
  const uniqueClinics = getUniqueClinics(clinic_Data || []);

  const [openPicker, setOpenPicker] = useState(null); // Track open picker

  const handleSubmit = async (values, {setSubmitting, resetForm}) => {
    try {
      const payload = {
        doctor_id: doctorId,
        clinic_id: values.clinicId,
        day_of_week: values.dayOfWeek,
        start_time: TransformTimeForPostgres(values.startTime),
        end_time: TransformTimeForPostgres(values.endTime),
        created_by: 'admin',
      };

      const response = await AddDoctorClinicScheduleRequest(payload);

      if (response.success) {
        Alert.alert(
          'Success',
          'Schedule added successfully! Do you want to add another?',
          [
            {
              text: 'No',
              onPress: () => {
                setIsAuthenticated(null);
                navigation.navigate('AppNavigator');
              },
              style: 'cancel',
            },
            {text: 'Yes', onPress: resetForm},
          ],
        );
      } else {
        Alert.alert('Error', response.error || 'Failed to create schedule');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        clinicId: '',
        dayOfWeek: '',
        startTime: new Date(),
        endTime: new Date(),
      }}
      validationSchema={ScheduleValidationSchema}
      onSubmit={handleSubmit}>
      {({
        values,
        setFieldValue,
        handleSubmit: formikSubmit,
        isSubmitting,
        errors,
        touched,
      }) => (
        <ScrollView contentContainerStyle={styles.container}>
          {/* Clinic Dropdown */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Clinic</Text>
            <Dropdown
              style={styles.dropdown}
              data={uniqueClinics}
              labelField="label"
              valueField="value"
              placeholder="Choose a clinic"
              value={values.clinicId}
              onChange={item => setFieldValue('clinicId', item.value)}
            />
            {touched.clinicId && errors.clinicId && (
              <Text style={styles.errorText}>{errors.clinicId}</Text>
            )}
          </View>

          {/* Day of Week Dropdown */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Day of Week</Text>
            <Dropdown
              style={styles.dropdown}
              data={WEEK_DAYS}
              labelField="label"
              valueField="value"
              placeholder="Select a Day"
              value={values.dayOfWeek}
              onChange={item => setFieldValue('dayOfWeek', item.value)}
            />
            {touched.dayOfWeek && errors.dayOfWeek && (
              <Text style={styles.errorText}>{errors.dayOfWeek}</Text>
            )}
          </View>

          {/* Start Time Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Start Time</Text>
            <TimePicker
              value={values.startTime}
              onChange={time => setFieldValue('startTime', time)}
              onFocus={() => setOpenPicker('startTime')}
              onBlur={() => setOpenPicker(null)}
              isFocus={openPicker === 'startTime'}
            />
            {touched.startTime && errors.startTime && (
              <Text style={styles.errorText}>{errors.startTime}</Text>
            )}
          </View>

          {/* End Time Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>End Time</Text>
            <TimePicker
              value={values.endTime}
              onChange={time => setFieldValue('endTime', time)}
              onFocus={() => setOpenPicker('endTime')}
              onBlur={() => setOpenPicker(null)}
              isFocus={openPicker === 'endTime' && openPicker !== 'startTime'} // Ensure only one picker is open
            />
            {touched.endTime && errors.endTime && (
              <Text style={styles.errorText}>{errors.endTime}</Text>
            )}
          </View>

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            {isSubmitting ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={formikSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default DoctorClinicScheduleScreen;
