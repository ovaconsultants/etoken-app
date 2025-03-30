import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = createJSONStorage(() => AsyncStorage);
export const userTokenAtom = atomWithStorage('token', null, storage);

export const isAuthenticatedAtom = atom(async (get) => {
  const token = await get(userTokenAtom);
  return !!token;
});