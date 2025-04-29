import { postData, fetchData } from './apiService';
import { API_ENDPOINTS } from '../constants/endPoints/apiRoutes';

// Adding a new clinic
export const AddClinicRequest = async (dataObject) => {
  try {
    const route = API_ENDPOINTS.DOCTOR.ADD_CLINIC;
    const data = await postData(route, dataObject, {});
    return data;
  } catch (error) {
    console.error('Failed to add clinic:', error);
    throw error;
  }
};

export const FetchAllClinicRequestForDoctor = async (doctor_id) => {
  try {
    const route = API_ENDPOINTS.DOCTOR.FETCH_ALL_CLINICS_OF_A_DOCTOR;
    const data = await fetchData(route, { doctor_id });
    return data.clinics ;
  } catch (error) {
    console.error('Failed to get clinics:', error);
    throw error;
  }
} 