
import { postData } from './apiServices';
import { API_ENDPOINTS } from '../constants/endPoints/apiRoutes';
import { setAuthToken } from '../utils/tokenManager';



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

  export const signOut = () => {
    // Clear the token in the token manager
    setAuthToken(null);
  };
