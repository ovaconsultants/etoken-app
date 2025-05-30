import AsyncStorage from '@react-native-async-storage/async-storage';
import {doctorIdAtom} from '../atoms/doctorAtoms/doctorAtom';
import {doctorInfoAtom} from '../atoms/doctorAtoms/doctorAtom';
import {doctorClinicDetailsAtom} from '../atoms/doctorAtoms/doctorAtom';
import {homeRefreshKeyAtom} from '../atoms/refreshAtoms/homePageRefreshAtom';
import {userTokenAtom} from '../atoms/authAtoms/authAtom';
import {patientsAtom} from '../atoms/patientAtoms/patientAtom';


import { deleteAccount } from '../services/authService';
import { Alert } from 'react-native';


import { getDefaultStore } from 'jotai'; // Changed import

function resetAllAtoms() {
  const store = getDefaultStore();
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


export const handleDeleteAccount = async (doctorId) => {
  const res = await Alert.alert(
    'Delete Account?',
    'Are you sure you want to delete your account? This action is irreversible.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: async () => {
        if (!doctorId) {return;}
        const response = await deleteAccount(doctorId);
        if (response.success) {
          console.log('Account deleted successfully');
        }
        else {
          console.error('Failed to delete account:', response);
        }
        // Reset all atoms and clear AsyncStorage
        console.log('Resetting all atoms and clearing AsyncStorage');
        handleSignOut();
      } },
    ],
  );
}
