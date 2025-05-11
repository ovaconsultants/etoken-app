import {API_URL} from '../constants/globalConstants';

export const uploadProfileImage = async (
  imageData,
  userId,
  userType = 'doctor',
) => {
  try {
     console.log('Uploading profile image:', {
      userId,
      userType,
      imageData,
    });
    const formData = new FormData();
    formData.append(`${userType}_id`, userId.toString());
    formData.append('profile_picture', {
      uri: imageData.uri,
      type: imageData.type || 'image/jpeg',
      name: `profile_doctor_${userId}.jpg`,
    });

    // Determine endpoint based on user type
    const endpoint = `${API_URL}${userType}/uploadDoctorProfilePicture`;
    console.log('Endpoint:', endpoint);
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

 
     console.log('Response:', response);
    return await response;
  } catch (error) {
    console.error(`Profile image upload error (${userType} ${userId}):`, error);
    throw error;
  }
};

/**
 * Specific doctor profile image upload
 */
export const UploadDoctorProfileImageRequest = (imageData, doctorId) => {
  console.log('Doctor ID:', doctorId);
  const userId = doctorId;
  return uploadProfileImage(imageData, userId, 'doctor');
};

/**
 * Specific patient profile image upload
 */
export const UploadPatientProfileImageRequest = (imageData, patientId) => {
  const userId = patientId;
  return uploadProfileImage(imageData, userId, 'patient');
};
