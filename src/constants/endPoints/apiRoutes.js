
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
    UPDATE_PATIENT: '/patient/updatePatient',
  },
  TOKEN : {
    FETCH_PT_TOKENS:'/token/fetchTokensForPatients',
    INSERT_PT_TOKEN:'/token/insertToken',
    UPDATE_PT_TOKEN: '/token/updateToken',
    RECALL_PT_TOKEN:'/token/toggleRecallStatus',
  },
  ADVERTISEMENT : {
    FETCH_ACTIVE_ADVERTISEMENT : '/advertisement/fetchActiveAdvertisements',
  },
};
