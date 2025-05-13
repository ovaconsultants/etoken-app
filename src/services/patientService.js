import { fetchData,postData,putData} from './apiService';
import { API_ENDPOINTS } from '../constants/endPoints/apiRoutes';

export const FetchPatientsRequest = async(doctor_id) => {
    try {
        const route = API_ENDPOINTS.PATIENT.FETCH_ALL_PATIENTS_BY_DOCTOR_ID;
        const data = await fetchData(route , { doctor_id });
        return data.patients;
      } catch (error) {
        console.error('Failed to get tokens:', error);
        throw error;
      }
};

// inserting a patient for particular clinic
export const InsertPatientRequest = async (patientDataObj) => {
  try {
    const route = API_ENDPOINTS.PATIENT.INSERT_PATIENT;
    const data = await postData(route,patientDataObj);
    return data.patient_id;
  } catch (error) {
    console.error('Failed to get tokens:', error);
    throw error;
  }
};

export const UpdatePatientRequest = async (patientDataObj) => {
  try {
    const route = API_ENDPOINTS.PATIENT.UPDATE_PATIENT;
    const data = await putData(route,patientDataObj);
    return data;
  } catch (error) {
    console.error('Failed to get tokens:', error);
    throw error;
  }
}

