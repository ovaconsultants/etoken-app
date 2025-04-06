import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
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
import { ScheduleValidationSchema } from '../../utils/ClinicValidationSchema';
import { showToast, ToastMessage} from '../../components/toastMessage/ToastMessage';

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
  const [openPicker, setOpenPicker] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    clinicId: false,
    dayOfWeek: false,
    startTime: false,
    endTime: false
  });
  const [touchedFields, setTouchedFields] = useState({
    clinicId: false,
    dayOfWeek: false,
    startTime: false,
    endTime: false
  });

  const handleFieldBlur = (fieldName, value) => {
    setTouchedFields(prev => ({...prev, [fieldName]: true}));
    try {
      ScheduleValidationSchema.validateSyncAt(fieldName, {[fieldName]: value});
      setFieldErrors(prev => ({...prev, [fieldName]: false}));
    } catch {
      setFieldErrors(prev => ({...prev, [fieldName]: true}));
    }
  };

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
        showToast('Schedule added successfully!', 'success', {
          duration: 3000,
          onHide: () => {
            // After toast hides, show action options
            showToast(
              'Add another schedule?',
              'info',
              {
                duration: 4000,
                action: {
                  text: 'No, go back',
                  onPress: () => {
                    setIsAuthenticated(null);
                    navigation.navigate('AppNavigator');
                  }
                }
              }
            );
          }
        });
        
        resetForm();
        setFieldErrors({
          clinicId: false,
          dayOfWeek: false,
          startTime: false,
          endTime: false
        });
        setTouchedFields({
          clinicId: false,
          dayOfWeek: false,
          startTime: false,
          endTime: false
        });
      } else {
        showToast(response.error || 'Failed to create schedule', 'error');
      }
    } catch (err) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastMessage />
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
        }) => (
          <ScrollView contentContainerStyle={styles.container}>
            {/* Clinic Dropdown */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Select Clinic
                <Text> *</Text>
              </Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  touchedFields.clinicId && fieldErrors.clinicId && styles.errorInput
                ]}
                data={uniqueClinics}
                labelField="label"
                valueField="value"
                placeholder="Choose a clinic"
                value={values.clinicId}
                onChange={item => {
                  setFieldValue('clinicId', item.value);
                  if (fieldErrors.clinicId) {
                    setFieldErrors(prev => ({...prev, clinicId: false}));
                  }
                }}
                onBlur={() => handleFieldBlur('clinicId', values.clinicId)}
              />
            </View>

            {/* Day of Week Dropdown */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Day of Week
                <Text style={{color: 'red'}}> *</Text>
              </Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  touchedFields.dayOfWeek && fieldErrors.dayOfWeek && styles.errorInput
                ]}
                data={WEEK_DAYS}
                labelField="label"
                valueField="value"
                placeholder="Select a Day"
                value={values.dayOfWeek}
                onChange={item => {
                  setFieldValue('dayOfWeek', item.value);
                  if (fieldErrors.dayOfWeek) {
                    setFieldErrors(prev => ({...prev, dayOfWeek: false}));
                  }
                }}
                onBlur={() => handleFieldBlur('dayOfWeek', values.dayOfWeek)}
              />
            </View>

            {/* Start Time Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>
                Start Time
                <Text> *</Text>
              </Text>
              <TimePicker
                value={values.startTime}
                onChange={time => {
                  setFieldValue('startTime', time);
                  if (fieldErrors.startTime) {
                    setFieldErrors(prev => ({...prev, startTime: false}));
                  }
                }}
                onFocus={() => setOpenPicker('startTime')}
                onBlur={() => {
                  setOpenPicker(null);
                  handleFieldBlur('startTime', values.startTime);
                }}
                isFocus={openPicker === 'startTime'}
                style={touchedFields.startTime && fieldErrors.startTime ? styles.errorInput : null}
              />
            </View>

            {/* End Time Picker */}
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>
                End Time
                <Text> *</Text>
              </Text>
              <TimePicker
                value={values.endTime}
                onChange={time => {
                  setFieldValue('endTime', time);
                  if (fieldErrors.endTime) {
                    setFieldErrors(prev => ({...prev, endTime: false}));
                  }
                }}
                onFocus={() => setOpenPicker('endTime')}
                onBlur={() => {
                  setOpenPicker(null);
                  handleFieldBlur('endTime', values.endTime);
                }}
                isFocus={openPicker === 'endTime' && openPicker !== 'startTime'}
                style={touchedFields.endTime && fieldErrors.endTime ? styles.errorInput : null}
              />
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
    </>
  );
};

export default DoctorClinicScheduleScreen;