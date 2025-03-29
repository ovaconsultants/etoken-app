import {API_URL} from '../config/apiUrl';

/**
 * Specialized service for uploading profile images
 * Handles all the FormData preparation and headers automatically
 */
export const uploadProfileImage = async (
  imageData,
  userId,
  userType = 'doctor',
) => {
  try {
    // Create FormData object
    const formData = new FormData();
    formData.append(`${userType}_id`, userId.toString());
    formData.append('profile_picture', {
      uri: imageData.uri,
      type: imageData.type || 'image/jpeg',
      name: `profile_${userType}_${userId}.jpg`,
    });

    // Determine endpoint based on user type
    const endpoint = `${API_URL}${userType}/uploadDoctorProfilePicture`;
    console.log('Endpoint:', endpoint);
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
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
 * Specific doctor profile image upload
 */
export const UploadDoctorProfileImageRequest = (imageData, doctorId) => {
  return uploadProfileImage(imageData, doctorId, 'doctor');
};

/**
 * Specific patient profile image upload
 */
export const UploadPatientProfileImageRequest = (imageData, patientId) => {
  return uploadProfileImage(imageData, patientId, 'patient');
};
