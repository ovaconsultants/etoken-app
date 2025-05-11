
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
    UPDATE_DOCTOR_DETAILS: '/doctor/updateDoctor',
    FETCH_DOCTORS_WITH_ID : '/doctor/fetchAllDoctors',
    ADD_CLINIC:'/doctor/addClinic',
    ADD_DOCTOR_CLINIC_SCHEDULE:'/doctor/schedule',
    FETCH_ALL_CLINICS_OF_A_DOCTOR:'/doctor/fetchClinicsByDoctorId',
    ADD_DOCTOR_PROFILE_PICTURE:'/doctor/uploadDoctorProfilePicture',
    GET_DOCTOR_PROFILE_IMAGE:'/doctor/getDoctorProfilePicture',
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
