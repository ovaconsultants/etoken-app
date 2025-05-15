import AsyncStorage from '@react-native-async-storage/async-storage';
import {doctorIdAtom} from '../atoms/doctorAtoms/doctorAtom';
import {doctorInfoAtom} from '../atoms/doctorAtoms/doctorAtom';
import {doctorClinicDetailsAtom} from '../atoms/doctorAtoms/doctorAtom';
import {homeRefreshKeyAtom} from '../atoms/refreshAtoms/homePageRefreshAtom';
import {userTokenAtom} from '../atoms/authAtoms/authAtom';
import {patientsAtom} from '../atoms/patientAtoms/patientAtom';

import { getDefaultStore } from 'jotai'; // Changed import

function resetAllAtoms() {
  const store = getDefaultStore(); 
  console.log('store', store);// Get the default store instance
  const atomsToReset = [
    doctorIdAtom,
    doctorInfoAtom,
    doctorClinicDetailsAtom,
    homeRefreshKeyAtom,
    userTokenAtom,
    patientsAtom,
  ];

  atomsToReset.forEach(atom => {
    store.set(atom, null);
  });
}

export const handleSignOut = async () => {
  console.log('Reset all atoms');
  resetAllAtoms();
  await AsyncStorage.clear();
};
