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

// Fetching the specializations
export const FetchSpecializationsRequest = async account_id => {
  try {
    const route = API_ENDPOINTS.ACCOUNT.GET_SPECIALIZATIONS;
    const data = await fetchData(route, { account_id });
    return data;
  } catch (error) {
    console.error('Failed to get specializations:', error);
    throw error;
  }
};
