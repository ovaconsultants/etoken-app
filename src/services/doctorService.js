import {postData, putData ,fetchData} from './apiService';
import {API_ENDPOINTS} from '../constants/endPoints/apiRoutes';

// Adding a new schedule  for doctor for a clinic
export const AddDoctorClinicScheduleRequest = async dataObject => {
  try {
    const route = API_ENDPOINTS.DOCTOR.ADD_DOCTOR_CLINIC_SCHEDULE;
    const data = await postData(route, dataObject, {});
    return data;
  } catch (error) {
    console.error('Failed to add schedule:', error);
    throw error;
  }
};

export const UpdateDoctorProfileDetailsRequest = async doctorDataObj => {
  try {
    const route = API_ENDPOINTS.DOCTOR.UPDATE_DOCTOR_DETAILS;
    const data = await putData(route, doctorDataObj, {});
    return data ;
  } catch (error) {
    console.error('Failed to add schedule:', error);
    throw error;
  }
};


export const FetchDoctorWithIdRequest = async (doctor_id) => {
  try {
    const route = API_ENDPOINTS.DOCTOR.FETCH_DOCTORS_WITH_ID;
    const data = await fetchData(route, { doctor_id });
    return data;
  } catch (error) {
    console.error('Failed to get clinics:', error);
    throw error;
  }
}
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
