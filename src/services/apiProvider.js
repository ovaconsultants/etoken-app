// src/services/api.js
import axios from 'axios';
import Config from 'react-native-config';

const httpClient = axios.create({
  baseURL: Config.API_BASE_URL || 'http://localhost:3001/',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log('Config.API_BASE_URL in api provider ', Config.API_BASE_URL);


httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
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

export default httpClient;
