import { postData, putData } from './apiService';
import { API_ENDPOINTS } from '../constants/endPoints/apiRoutes';

// Adding a new schedule  for doctor for a clinic
export const AddDoctorClinicScheduleRequest = async (dataObject) => {
  try {
    const route = API_ENDPOINTS.DOCTOR.ADD_DOCTOR_CLINIC_SCHEDULE;
    const data = await postData(route, dataObject, {});
    return data;
  } catch (error) {
    console.error('Failed to add schedule:', error);
    throw error;
  }
};

// // update a Profile for doctor 
// export const UpdateDoctorProfileRequest = async (dataObject) => {
//   try {
//     const route = API_ENDPOINTS.DOCTOR.ADD_DOCTOR_PROFILE_PICTURE;
//     const data = await postData(route, dataObject, {});
//     return data;
//   } catch (error) {
//     console.error('Failed to update profile:', error);
//     throw error;
//   }
// };
