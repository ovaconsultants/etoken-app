import { fetchData } from './apiService';
import { API_ENDPOINTS } from '../constants/endPoints/apiRoutes';

// Fetching the account details
export const AccountDetailsRequest = async () => {
  try {
    const route = API_ENDPOINTS.ACCOUNT.GET_REGISTER_ACCOUNTS;
    const data = await fetchData(route);
    return data;
  } catch (error) {
    console.error('Failed to get account details:', error);
    throw error;
  }
};
