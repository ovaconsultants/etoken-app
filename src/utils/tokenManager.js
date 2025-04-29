// src/utils/tokenManager.js
import httpClient from '../services/apiProvider';

export const setAuthToken = (token) => {
  console.log('setting the auth token' , token);
  if (token) {
    httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete httpClient.defaults.headers.common.Authorization;
  }
};
