import { atomWithStorage} from 'jotai/utils';
import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an atom with an initial value of null
export const userTokenAtom = atomWithStorage('token', null, AsyncStorage);

export const isAuthenticatedAtom = atom(
    get => !!get(userTokenAtom),
    (_, set, newValue) => {
        if (newValue) {
            set(userTokenAtom, JSON.stringify(newValue));
        } else {
            set(userTokenAtom, null);
        }
    }
);
