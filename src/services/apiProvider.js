import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {setAuthToken} from '../utils/tokenManager';
import {API_URL} from '../constants/globalConstants';
import {setErrorAtom, resetErrorAtom} from '../atoms/errorAtoms/errorAtom';
import { getDefaultStore } from 'jotai';
// Create axios instance
const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const store = getDefaultStore();
// Network status check function
const checkNetworkStatus = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

// Modified handlers to use the direct functions

const handleGlobalError = (error) => {
  store.set(setErrorAtom, {
    message: error.message || 'An unexpected error occurred',
    code: error.code || (error.isNetworkError ? 'NETWORK_ERROR' : 'UNKNOWN_ERROR'),
  });
};

// Clear global error

const clearGlobalError = () => {
  store.set(resetErrorAtom);
};


// Request retry handler
const MAX_RETRIES = 3;
const retryRequest = async (error, retryCount = 0) => {
  const config = error.config;

  // Check if we should retry
  if (!config || !error.response || retryCount >= MAX_RETRIES) {
    return Promise.reject(error);
  }

  // Retry only on certain status codes
  const retryStatusCodes = [408, 429, 500, 502, 503, 504];
  if (!retryStatusCodes.includes(error.response.status)) {
    return Promise.reject(error);
  }

  // Exponential backoff
  const delay = Math.pow(2, retryCount) * 1000 + Math.random() * 1000;

  return new Promise(resolve => {
    setTimeout(() => {
      console.log(
        `Retrying request (${retryCount + 1}/${MAX_RETRIES}) to ${config.url}`,
      );
      resolve(httpClient(config));
    }, delay);
  });
};

// Request interceptor
httpClient.interceptors.request.use(
  async config => {
    // Add AbortController to each request
    const controller = new AbortController();
    config.signal = controller.signal;

    // Store controller for potential cancellation
    config.abortController = controller;

    // Check network status before making request
    const isConnected = await checkNetworkStatus();
    if (!isConnected) {
      controller.abort();
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
  error => {
    console.error('Request error:', error.message);
    return Promise.reject(error);
  },
);

// Response interceptor
httpClient.interceptors.response.use(
  response => {
    // Clear any existing global error on successful response
    clearGlobalError();
    return response;
  },
  async error => {
    // Handle canceled requests (offline case or manual abort)
    if (axios.isCancel(error)) {
      const errorObj = {
        isNetworkError: true,
        message: error.message || 'Request was canceled',
        code: 'REQUEST_CANCELED',
      };
      handleGlobalError(errorObj);
      return Promise.reject(errorObj);
    }

    // Handle other errors
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        message: error.response.data?.message || 'An error occurred',
        url: error.config.url,
        method: error.config.method,
      });

      // First try to retry the request
      if (
        error.config &&
        (!error.config.__isRetry || error.config.retryCount < MAX_RETRIES)
      ) {
        error.config.__isRetry = true;
        error.config.retryCount = (error.config.retryCount || 0) + 1;
        return retryRequest(error, error.config.retryCount);
      }

      // Handle specific HTTP errors
      const errorObj = {
        ...error.response.data,
        status: error.response.status,
        isNetworkError: false,
        code: error.response.data?.code || `HTTP_${error.response.status}`,
      };

      switch (error.response.status) {
        case 401:
          AsyncStorage.clear();
          setAuthToken(null);
          errorObj.message = 'Session expired. Please log in again.';
          errorObj.code = 'SESSION_EXPIRED';
          break;
        case 404:
          errorObj.message = 'Resource not found';
          errorObj.code = 'RESOURCE_NOT_FOUND';
          break;
        case 500:
          errorObj.message = 'Server error';
          errorObj.code = 'SERVER_ERROR';
          break;
        default:
          errorObj.message =
            error.response.data?.message || 'An unexpected error occurred';
          errorObj.code = error.response.data?.code || 'UNKNOWN_ERROR';
          break;
      }

      // Update global error state
      handleGlobalError(errorObj);

      return Promise.reject(errorObj);
    } else if (error.request) {
      // Network errors (no response received)
      const errorObj = {
        isNetworkError: true,
        message: 'Network error - no response received',
        code: 'NETWORK_ERROR',
      };
      handleGlobalError(errorObj);
      return Promise.reject(errorObj);
    } else {
      // Request setup errors
      const errorObj = {
        isNetworkError: false,
        message: error.message || 'Request setup error',
        code: 'REQUEST_SETUP_ERROR',
      };
      handleGlobalError(errorObj);
      return Promise.reject(errorObj);
    }
  },
);

// Export function to cancel ongoing requests
export const cancelOngoingRequest = config => {
  if (config.abortController) {
    config.abortController.abort();
  }
};

export default httpClient;
