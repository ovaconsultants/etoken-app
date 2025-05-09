// SignUpValidation.js
import * as Yup from 'yup';

export const SignUpValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('First name is required')
    .max(50, 'First name must be 50 characters or less'),
  lastName: Yup.string()
    .trim()
    .required('Last name is required')
    .max(50, 'Last name must be 50 characters or less'),
  mobileNumber: Yup.string()
    .trim()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
  phoneNumber: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .nullable(),
  email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid email address')
    .required('Email is required'),
  specialization: Yup.string().required('Specialization is required'), 
  account: Yup.string().required('Account is required'),
});

