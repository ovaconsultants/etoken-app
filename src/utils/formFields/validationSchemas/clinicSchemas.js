// validation/schemas.js
import * as Yup from 'yup';

export const ClinicValidationSchema = Yup.object().shape({
  clinic_name: Yup.string().required('Clinic name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip_code: Yup.string()
    .required('Zip code is required')
    .matches(/^\d{5}$/, 'Zip code must be 5 digits'),
  doctor_id: Yup.string().required('Doctor ID is required'),
  created_by: Yup.string().required('Created by is required'),
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
