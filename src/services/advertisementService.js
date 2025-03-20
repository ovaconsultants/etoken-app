import { fetchData } from './apiService';
import { API_ENDPOINTS } from '../constants/endPoints/apiRoutes';

export const FetchActiveAdvertisement = async({doctor_id , clinic_id}) => {
   console.log('api ', doctor_id , clinic_id);
    try {
        const route = API_ENDPOINTS.ADVERTISEMENT.FETCH_ACTIVE_ADVERTISEMENT;
        const data = await fetchData(route,{doctor_id , clinic_id});
        return data;
      } catch (error) {
        console.error('Failed to get tokens:', error);
        throw error;
      }
};
