import * as Yup from 'yup';

// Define the validation schema
export const ReceptionFormValidationSchema = Yup.object().shape({
  patient_name: Yup.string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, 'Full Name must contain only letters')
    .min(3, 'Full Name must be at least 3 characters')
    .max(50, 'Full Name must be 50 characters or less')
    .required('Full Name is required'),
  mobile_number: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .max(10, 'Mobile number cannot exceed 10 digits')
    .required('Mobile number is required'),
  age : Yup.number()
    .typeError('Age must be a number')
    .integer('Age must be an integer')
    .min(0, 'Age cannot be negative')
    .required('Age is required'),  
  area: Yup.string()
    .trim()
    .min(2, 'Locality/Area must be at least 2 characters')
    .max(100, 'Locality/Area must be 100 characters or less')
    .required('Locality/Area is required'),

    email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid email address')
    .notRequired(),
});

