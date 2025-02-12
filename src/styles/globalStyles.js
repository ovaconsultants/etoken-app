
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { userTokenAtom } from '../atoms/authAtoms/authAtom';



const API_BASE_URL = 'https://your-api-endpoint.com';

export const apiConnector = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication tokens
apiConnector.interceptors.request.use(
  (config) => {
    const [token] = useAtomValue(userTokenAtom); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);


apiConnector.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        message: error.response.data?.message || 'An error occurred',
        url: error.config.url,
        method: error.config.method,
      });

      // Log the exception to the server
      try {
        await apiConnector.post('/api/exception/logException', {
          exception_description: `Error found in API response: ${error.response.status} - ${error.response.data?.message || 'An error occurred'}`,
          platform: 'Mobile- IOS/Android', // Adjust as needed
          created_by: 'AdminUser', // Adjust as needed
        });
      } catch (logError) {
        console.error('Failed to log exception:', logError);
      }

      switch (error.response.status) {
        case 401:
          // Redirect to login or refresh token
          console.warn('Unauthorized: Redirecting to login...');
          break;
        case 404:
          console.warn('Resource not found:', error.config.url);
          break;
        case 500:
          console.error('Server error:', error.response.data);
          break;
        default:
          console.warn('Unhandled error:', error.response.status);
          break;
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);
