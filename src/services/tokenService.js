import { fetchData , postData } from './apiService';
import { API_ENDPOINTS } from '../constants/endPoints/apiRoutes';

// Fetching the all tokens for a specific doctor and specfic clinic
export const FetchTokensRequest = async (doctor_id, clinic_id) => {
  try {
    const route = API_ENDPOINTS.TOKEN.FETCH_PT_TOKENS;
    const data = await fetchData(route, { doctor_id, clinic_id });
    return data;
  } catch (error) {
    console.error('Failed to get tokens:', error);
    throw error;
  }
};

export const GenerateTokenRequest = async (patientTokenDataObj) => {
  try {
    const route = API_ENDPOINTS.TOKEN.INSERT_PT_TOKEN;
    const data = await postData(route,patientTokenDataObj);
    return data.token_no;
  } catch (error) {
    console.error('Failed to get tokens:', error);
    throw error;
  }
};


