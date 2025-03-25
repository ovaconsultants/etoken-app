import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';

const initialDoctorClinicDetails = [
  {
    clinic_id: 0,
    clinic_name: '',
    clinic_address: '',
    clinic_city: '',
    clinic_state: '',
    clinic_zipcode: '',
  },
];

const initialDoctorInfo = {
  doctor_id: '',
  doctor_name: '',
  doctor_profile_pic_directory_api: '',
  specialization_name: 'Oral Surgeon Dentist',
  specialization_description: null,
};

export const doctorClinicDetailsAtom = atomWithStorage(
  'doctorDetails',
  initialDoctorClinicDetails,
  createJSONStorage(() => AsyncStorage)
);

export const doctorInfoAtom = atomWithStorage('doctorInfo',initialDoctorInfo , createJSONStorage(() => AsyncStorage));
export const doctorIdAtom = atomWithStorage('doctorId', null, AsyncStorage);
// Atom for storing errors related to doctor details
export const doctorErrorAtom = atom(null);
