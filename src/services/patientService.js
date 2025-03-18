import { fetchData  , postData} from './apiService';
import { API_ENDPOINTS } from '../constants/endPoints/apiRoutes';

export const FetchPatientsRequest = async() => {
    try {
        const route = API_ENDPOINTS.PATIENT.FETCH_ALL_PATIENTS;
        const data = await fetchData(route);
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
    console.log('data after inserting the patient' , data);
    return data.patient_id;
  } catch (error) {
    console.error('Failed to get tokens:', error);
    throw error;
  }
};
