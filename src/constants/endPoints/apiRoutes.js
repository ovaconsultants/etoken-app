
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

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
    ADD_DOCTOR_PROFILE_PICTURE:'/doctor/uploadDoctorProfilePicture',
},
  ACCOUNT: {
    GET_REGISTER_ACCOUNTS: '/registration/accounts',
    GET_SPECIALIZATIONS: '/registration/specializations',

  },
  PATIENT: {
    INSERT_PATIENT: '/patient/insertPatient',
    FETCH_ALL_PATIENTS: '/patient/fetchAllPatients',
  },
  TOKEN : {
    FETCH_PT_TOKENS:'/token/fetchTokensForPatients',
    INSERT_PT_TOKEN:'/token/insertToken',
  },
};
