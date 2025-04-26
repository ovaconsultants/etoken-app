// atoms/authAtoms/authAtom.js
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = createJSONStorage(() => AsyncStorage);
export const userTokenAtom = atomWithStorage('token', null, storage);

// Simple synchronous atom that will update once token loads
export const isAuthenticatedAtom = atom((get) => {
  const token = get(userTokenAtom); // This will be null initially then update
  return token !== null;
});