import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {Dropdown} from 'react-native-element-dropdown';
import {useSetAtom, useAtomValue} from 'jotai';
import TimePicker from '../../components/timePicker/TimePicker';
import {AddDoctorClinicScheduleRequest} from '../../services/doctorService';
import {userTokenAtom} from '../../atoms/authAtoms/authAtom';
import {doctorClinicDetailsAtom} from '../../atoms/doctorAtoms/doctorAtom';
import {WEEK_DAYS} from '../../constants/formComponentsData/weekDaysDropdownData';
import {TransformTimeForPostgres} from '../../utils/formatTimeForPostgres';
import {ScheduleValidationSchema} from '../../utils/ClinicValidationSchema';
import {
  showToast,
  ToastMessage,
} from '../../components/toastMessage/ToastMessage';
import styles from './DoctorClinicScheduleScreen.styles';

const getUniqueClinics = (clinics = []) =>
  [...new Set(clinics.map(c => `${c.clinic_name}_${c.clinic_address}`))]
    .map(key =>
      clinics.find(c => `${c.clinic_name}_${c.clinic_address}` === key),
    )
    .map(c => ({
      label: `${c.clinic_name} - ${c.clinic_address}`,
      value: c.clinic_id,
    }));

const Field = ({
  field,
  values,
  setFieldValue,
  data,
  placeholder,
  fieldStates,
  setFieldStates,
  handleFieldBlur,
  Component,
  ...props
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>
      {field.replace(/([A-Z])/g, ' $1')} <Text style={styles.required}>*</Text>
    </Text>
    <Component
      {...props}
      style={[
        styles.dropdown,
        fieldStates[field]?.touched &&
          fieldStates[field]?.error &&
          styles.errorInput,
      ]}
      data={data}
      value={values[field]}
      onChange={item => {
        setFieldValue(field, item?.value ?? item);
        fieldStates[field]?.error &&
          setFieldStates(prev => ({
            ...prev,
            [field]: {...prev[field], error: false},
          }));
      }}
      onBlur={() => handleFieldBlur(field, values[field])}
    />
  </View>
);

const DoctorClinicScheduleScreen = ({navigation, route}) => {
  const {doctor_id} = route?.params || {};
  const [openPicker, setOpenPicker] = useState(null);
  const [fieldStates, setFieldStates] = useState(
    Object.fromEntries(
      ['clinicId', 'dayOfWeek', 'startTime', 'endTime'].map(f => [
        f,
        {touched: false, error: false},
      ]),
    ),
  );
  const uniqueClinics = getUniqueClinics(useAtomValue(doctorClinicDetailsAtom));
  const setIsAuthenticated = useSetAtom(userTokenAtom);

  const handleFieldBlur = (field, value) => {
    setFieldStates(prev => ({
      ...prev,
      [field]: {...prev[field], touched: true},
    }));
    try {
      ScheduleValidationSchema.validateSyncAt(field, {[field]: value});
      setFieldStates(prev => ({
        ...prev,
        [field]: {...prev[field], error: false},
      }));
    } catch {
      setFieldStates(prev => ({
        ...prev,
        [field]: {...prev[field], error: true},
      }));
    }
  };

  const handleSubmit = async (values, {setSubmitting, resetForm}) => {
    showToast('Submitting...', 'info');
    try {
      const response = await AddDoctorClinicScheduleRequest({
        doctor_id,
        created_by: 'admin',
        clinic_id: values.clinicId,
        day_of_week: values.dayOfWeek,
        start_time: TransformTimeForPostgres(values.startTime),
        end_time: TransformTimeForPostgres(values.endTime),
      });

      if (response) {
        showToast('Schedule created!', 'success', {
          duration: 3000,
  
        });
        showToast('Add another?', 'info', {
          duration: 4000,
          action: {
            text: 'Home',
            onPress: () => navigation.navigate('AppNavigator'),
          },
        }),
        resetForm();
        setFieldStates(
          Object.fromEntries(
            Object.keys(fieldStates).map(f => [
              f,
              {touched: false, error: false},
            ]),
          ),
        );
      } else showToast(response.error || 'Failed to create schedule', 'error');
    } catch (err) {
      showToast('Error processing request', 'error');
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
            {['clinicId', 'dayOfWeek'].map(field => (
              <Field
                key={field}
                {...{
                  field,
                  values,
                  setFieldValue,
                  fieldStates,
                  setFieldStates,
                  handleFieldBlur,
                  data: field === 'clinicId' ? uniqueClinics : WEEK_DAYS,
                  placeholder:
                    field === 'clinicId' ? 'Choose clinic' : 'Select day',
                  Component: Dropdown,
                  labelField: 'label',
                  valueField: 'value',
                }}
              />
            ))}
            {['startTime', 'endTime'].map(field => (
              <Field
                key={field}
                {...{
                  field,
                  values,
                  setFieldValue,
                  fieldStates,
                  handleFieldBlur,
                  Component: TimePicker,
                  onFocus: () => setOpenPicker(field),
                  isFocus: openPicker === field,
                  onBlur: () => setOpenPicker(null),
                }}
              />
            ))}
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
      <ToastMessage />
    </>
  );
};

export default DoctorClinicScheduleScreen;
