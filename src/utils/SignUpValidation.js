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
  specializationId: Yup.string()
    .required('Specialization is required'),
  accountId: Yup.string()
    .required('Account is required')
});

export const validateField = async (schema, fieldName, value, formData, selectedAccount, selectedSpecialization) => {
  try {
    await schema.validateAt(fieldName, {
      ...formData,
      [fieldName]: value,
      accountId: selectedAccount,
      specializationId: selectedSpecialization
    });
    return { isValid: true, message: '' };
  } catch (err) {
    return { isValid: false, message: err.message };
  }
};

export const validateForm = async (schema, formData, selectedAccount, selectedSpecialization) => {
  try {
    await schema.validate({
      ...formData,
      accountId: selectedAccount,
      specializationId: selectedSpecialization
    }, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    const validationErrors = {};
    err.inner.forEach(error => {
      validationErrors[error.path] = error.message;
    });
    return { isValid: false, errors: validationErrors };
  }
};