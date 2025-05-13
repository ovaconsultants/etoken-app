import { atom } from 'jotai';

export const errorAtom = atom('No error');

// Function to set error
export const setError = (set, error) => {
  set(errorAtom, error);
};

// Function to reset error
export const resetError = (set) => {
  set(errorAtom, null);
};
