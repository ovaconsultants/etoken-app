import { postData } from './apiService';
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
