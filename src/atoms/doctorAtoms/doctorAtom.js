import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';

const initialDoctorDetails = [
  {
    doctor_id: 0,
    doctor_name: '',
    clinic_id: 0,
    clinic_name: '',
    clinic_address: '',
    clinic_city: '',
    clinic_state: '',
    clinic_zipcode: '',
  },
];

export const doctorDetailsAtom = atomWithStorage(
  'doctorDetails',
  initialDoctorDetails,
  createJSONStorage(() => AsyncStorage)
);

export const doctorIdAtom = atomWithStorage('doctorId', null, AsyncStorage);
// Atom for storing errors related to doctor details
export const doctorErrorAtom = atom(null);
