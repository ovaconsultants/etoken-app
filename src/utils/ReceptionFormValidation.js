import * as Yup from 'yup';

// Define the validation schema
export const ReceptionFormValidationSchema = Yup.object().shape({
  patient_name: Yup.string()
    .trim()
    .required('Full Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Full Name must contain only letters')
    .min(3, 'Full Name must be at least 3 characters')
    .max(50, 'Full Name must be 50 characters or less'),

    mobile_number: Yup.string()
    .trim()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .max(10, 'Mobile number cannot exceed 10 digits'),
  area: Yup.string()
    .trim()
    .required('Locality/Area is required')
    .min(2, 'Locality/Area must be at least 2 characters')
    .max(100, 'Locality/Area must be 100 characters or less'),

  email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid email address')
    .required('Email is required'),
});

// Async validation for specific fields
export const validateField = async (schema, fieldName, value, formData) => {
  try {
    await schema.validateAt(fieldName, { ...formData, [fieldName]: value });
    return { isValid: true, message: '' };
  } catch (err) {
    return { isValid: false, message: err.message };
  }
};

// Full form validation
export const validateForm = async (schema, formData) => {
  try {
    await schema.validate(formData, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    const validationErrors = {};
    err.inner.forEach(error => {
      validationErrors[error.path] = error.message;
    });
    return { isValid: false, errors: validationErrors };
  }
};
