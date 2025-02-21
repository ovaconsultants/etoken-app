// Base API URL (Uses environment variable if available)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-api.com';

// Organizing API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: '/doctor/signin',
    REGISTER: '',
    LOGOUT: '',
    REFRESH_TOKEN: '',
  },
  DOCTOR: {
    ADD_DOCTOR: '/doctor/addDoctor',
    ADD_CLINIC:'/doctor/addClinic',
    ADD_DOCTOR_CLINIC_SCHEDULE:'/doctor/schedule',
  },
  ACCOUNT: {
    GET_REGISTER_ACCOUNTS: '/registration/accounts',
    GET_SPECIALIZATIONS: '/registration/specializations',

  },
  PATIENT: {
    DELETE_PATIENT: '/patients/:id',
  },
};
