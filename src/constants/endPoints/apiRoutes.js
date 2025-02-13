// Base API URL (Uses environment variable if available)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-api.com';

// Organizing API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: '/doctor/signin',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  DOCTOR: {
    GET_DOCTORS: '/doctors',
    GET_DOCTOR: '/doctors/:id',
    CREATE_DOCTOR: '/doctors',
    UPDATE_DOCTOR: '/doctors/:id',
    DELETE_DOCTOR: '/doctors/:id',
  },
  PATIENT: {
    GET_PATIENTS: '/patients',
    GET_PATIENT: '/patients/:id',
    CREATE_PATIENT: '/patients',
    UPDATE_PATIENT: '/patients/:id',
    DELETE_PATIENT: '/patients/:id',
  },
};
