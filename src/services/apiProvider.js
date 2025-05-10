import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { setAuthToken } from '../utils/tokenManager';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import { API_URL } from '../constants/globalConstants';



// Create axios instance
const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Network status check function
const checkNetworkStatus = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

// Request interceptor
httpClient.interceptors.request.use(
  async (config) => {
    // Check network status before making request
    const isConnected = await checkNetworkStatus();
    if (!isConnected) {
      throw new axios.Cancel('Request canceled - no network connection');
    }

    // Add auth token if available
    const rawToken = await AsyncStorage.getItem('token');
    const token = rawToken?.replace(/^"(.*)"$/, '$1').trim();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error.message);
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle canceled requests (offline case)
    if (axios.isCancel(error)) {
      return Promise.reject({
        isNetworkError: true,
        message: 'No internet connection',
        code: 'NETWORK_OFFLINE',
      });
    }

    // Handle other errors
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        message: error.response.data?.message || 'An error occurred',
        url: error.config.url,
        method: error.config.method,
      });

      // Handle specific HTTP errors
      switch (error.response.status) {
        case 401:
          AsyncStorage.clear();
          setAuthToken(null);
          break;
        case 404:
          console.warn('Resource not found:', error.config.url);
          ErrorMessage({
            message: 'Resource not found',
            description: 'The requested resource could not be found.',
          });
          break;
        case 500:
          console.error('Server error:', error.response.data);
          ErrorMessage({
            message: 'Server error',
            description: 'An unexpected error occurred on the server.',
          });
          break;
        default:

          console.warn('Unhandled error:', error.response.status);
          ErrorMessage({
            message: 'Unhandled error',
            description: 'An unexpected error occurred.',
          });
          break;
      }

      return Promise.reject({
        ...error.response.data,
        status: error.response.status,
        isNetworkError: false,
      });
    } else if (error.request) {
      // Network errors (no response received)
      console.error('No response received:', error.request);
      ErrorMessage({
        message: 'Network error',
        description: 'No response received from the server.',
      });
      return Promise.reject({
        isNetworkError: true,
        message: 'Network error - no response received',
        code: 'NETWORK_ERROR',
      });
    } else {
      // Request setup errors

      console.error('Request setup error:', error.message);
      ErrorMessage({
        message: 'Request error',
        description: 'An error occurred while setting up the request.',
      });
      return Promise.reject({
        isNetworkError: false,
        message: error.message,
        code: 'REQUEST_ERROR',
      });
    }
  }
);

export default httpClient;