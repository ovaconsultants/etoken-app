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
  profile_picture_url: '',
  gender: null,
  date_of_birth: null,
  qualification: null,
  experience_years: null,
  consultation_fee: null,
  biography: null,
  address: null,
  phone_number: null,
  registration_number: null,
  specialization: null,
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
