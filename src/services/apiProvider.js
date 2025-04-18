// src/services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/apiUrl';

const apiURL = API_URL || 'https://etoken-api-dev.vercel.app/';
const httpClient = axios.create({
  baseURL: apiURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  async (config) => {
    const rawToken = await AsyncStorage.getItem('token');
    const token = rawToken?.replace(/^"(.*)"$/, '$1').trim();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.error('Request error:', error.message);
    return Promise.reject(error);
  }
);

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
