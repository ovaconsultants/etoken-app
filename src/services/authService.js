
import { postData, putData } from './apiService';
import { API_ENDPOINTS } from '../constants/endPoints/apiRoutes';
import { setAuthToken } from '../utils/tokenManager';


// Taking sign in request from ui and sending it to the server
export const SignInRequest = async (email, password) => {
    try {
      const route = API_ENDPOINTS.AUTH.SIGN_IN;
      const data = await postData(route, { email_or_mobile : email, password : password},{});
      return data;
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    }
  };

// Taking sign up request from ui and sending it to the server
export const SignUpRequest = async (dataObject) => {
    try {
      const route = API_ENDPOINTS.DOCTOR.ADD_DOCTOR;
      const data = await postData(route, dataObject, {});
      return data;
    } catch (error) {
      console.error('Sign-up failed:', error);
      throw error;
    }
  };
  export const signOut = () => {
    // Clear the token in the token manager
    setAuthToken(null);
  };

  export const deleteAccount = async (doctorId) => {
    console.log('Deleting account for doctorId:', doctorId);
    try {
      const route = API_ENDPOINTS.DOCTOR.DELETE_ACCOUNT;
      const response = await putData(route, {doctor_id : doctorId}, {});
      return response;
    } catch (error) {
      console.error('Delete account failed:', error);
      throw error;
    }
  }