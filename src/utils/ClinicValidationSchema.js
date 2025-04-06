import * as Yup from 'yup';

export const ClinicValidationSchema = Yup.object().shape({
  clinic_name: Yup.string().trim().required().min(3).max(50),
  address: Yup.string().trim().required().min(5).max(100),
  city: Yup.string().trim().required().min(2).max(50),
  state: Yup.string().trim().required().min(2).max(50),
  zip_code: Yup.string().trim().required().matches(/^\d{5}(-\d{4})?$/),
});


export const ScheduleValidationSchema = Yup.object().shape({
    clinicId: Yup.string().required(),
    dayOfWeek: Yup.string().required(),
    startTime: Yup.date()
      .required()
      .test('is-valid-time', 'Invalid time', value => value instanceof Date),
    endTime: Yup.date()
      .required()
      .test('is-valid-time', 'Invalid time', value => value instanceof Date)
      .min(
        Yup.ref('startTime'),
        'End time must be after start time'
      ),
  });

  export const SignInValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required')
      .max(50, 'Email too long'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .max(15, 'Password cannot exceed 15 characters')
      .required('Password is required'),
  });
  
 