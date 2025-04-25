import * as Yup from 'yup';

export const ClinicValidationSchema = Yup.object().shape({
  clinic_name: Yup.string().trim().required('Required').min(3).max(50),
  address: Yup.string().trim().required('Required').min(5).max(100),
  city: Yup.string().trim().required('Required').min(2).max(50),
  state: Yup.string().trim().required('Required').min(2).max(50),
  zip_code: Yup.string().trim().required('Required').matches(/^\d{6}$/, 'Must be 6 digits')
});

export const ScheduleValidationSchema = Yup.object().shape({
  clinicId: Yup.string().required('Please select a clinic'),
  dayOfWeek: Yup.string().required('Please select a day'),
  startTime: Yup.date().required('Start time is required'),
  endTime: Yup.date()
    .required('End time is required')
    .min(Yup.ref('startTime'), 'End time must be after start time'),
});

export const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

export const PatientSchema = Yup.object().shape({
  patient_name: Yup.string().trim().required('Patient Name is required'),
  mobile_number: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile Number')
    .required('Mobile Number is required'),
  area : Yup.string().trim().required('Area Name is required'),
  email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid Email')
});
