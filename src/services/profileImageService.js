import {API_URL} from '../constants/globalConstants';
import {API_ENDPOINTS} from '../constants/endPoints/apiRoutes';
import {fetchData} from './apiService';

export const uploadProfileImage = async (
  imageData,
  userId,
  userType = 'doctor',
) => {
  try {
    // Create FormData object
    const formData = new FormData();
    
    // Match backend field names exactly
    formData.append('userId', userId.toString()); // Changed from `${userType}_id` to 'userId'
    formData.append('image', {  // Changed from 'profile_picture' to 'image'
      uri: imageData.uri,
      type: imageData.type || 'image/jpeg',
      name: `profile_${userType}_${userId}.jpg`,
    });

    const endpoint = `${API_URL}${API_ENDPOINTS.DOCTOR.UPLOAD_IMAGE}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let React Native handle it
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Image upload failed');
    }

    return await response.json();

  } catch (error) {
    console.error(`Profile image upload error (${userType} ${userId}):`, error);
    throw error;
  }
};

/**
 * Doctor-specific profile image upload
 */
export const UploadDoctorProfileImageRequest = (imageData, doctorId) => {
  return uploadProfileImage(imageData, doctorId, 'doctor');
};

/**
 * Patient-specific profile image upload
 */
export const UploadPatientProfileImageRequest = (imageData, doctorId, patientId) => {
  const userId = `${doctorId}/${patientId}`;
  return uploadProfileImage(imageData, userId, 'patient');
};

/**
 * Get doctor profile image by ID
 */
export const GetDoctorProfileImageRequest = async doctorId => {
  try {
    const endpoint = API_ENDPOINTS.DOCTOR.GET_IMAGE;
    const params = {userId: doctorId};
    const data = await fetchData(endpoint, params);
    return data.imageUrl || null;
  } catch (error) {
    console.error(`Profile image fetch error for doctor_id=${doctorId}:`, error);
    throw error;
  }
};

/**
 * Get patient profile image by doctorId/patientId
 */
export const GetPatientProfileImageRequest = async (doctorId, patientId) => {
  console.log();
  try {
    const endpoint = API_ENDPOINTS.DOCTOR.GET_IMAGE;
    console.log(`Fetching patient profile image for doctor_id=${doctorId}, patient_id=${patientId}`);
    const params = {userId: `${doctorId}/${patientId}`};
    console.log(`Using endpoint: ${endpoint} with params:`, params);
    const data = await fetchData(endpoint, params);
    console.log('Received data for in GetPatientProfileImageRequest:', data);
    return data.imageUrl || null;
  } catch (error) {
    console.error(
      `Profile image fetch error for doctor_id=${doctorId}, patient_id=${patientId}:`,
      error,
    );
    throw error;
  }
};