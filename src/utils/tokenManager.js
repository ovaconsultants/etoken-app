// src/utils/tokenManager.js
import httpClient from '../services/apiProvider';

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
  // Update the httpClient headers
  if (token) {
    httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete httpClient.defaults.headers.common.Authorization;
  }
};

export const getAuthToken = () => authToken;
