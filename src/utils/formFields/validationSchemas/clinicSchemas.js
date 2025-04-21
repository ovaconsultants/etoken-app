import * as Yup from 'yup';

export const ClinicValidationSchema = Yup.object().shape({
  clinic_name: Yup.string()
    .trim()
    .required('Clinic name is required')
    .min(3, 'Clinic name must be at least 3 characters')
    .max(50, 'Clinic name cannot exceed 50 characters'),
  address: Yup.string()
    .trim()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address cannot exceed 100 characters'),
  city: Yup.string()
    .trim()
    .required('City is required')
    .min(2, 'City name must be at least 2 characters')
    .max(50, 'City name cannot exceed 50 characters')
    .matches(/^[a-zA-Z ]+$/, 'City name can only contain letters and spaces'),
  state: Yup.string()
    .trim()
    .required('State is required')
    .min(2, 'State name must be at least 2 characters')
    .max(50, 'State name cannot exceed 50 characters')
    .matches(/^[a-zA-Z ]+$/, 'State name can only contain letters and spaces'),
  zip_code: Yup.string()
    .trim()
    .required('Zip code is required')
    .matches(/^\d{5}$/, 'Zip code must be exactly 5 digits'),
  doctor_id: Yup.string()
    .trim()
    .required('Doctor ID is required')
    .matches(/^\d+$/, 'Doctor ID must be a number'),
  created_by: Yup.string()
    .trim()
    .required('Created by is required'),
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
