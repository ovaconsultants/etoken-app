// atoms/errorAtom.js
import { atom } from 'jotai';

// Base atom
export const errorAtom = atom({
  hasError: false,
  message: '',
  code: '',
});

// Derived write-only atoms for setting and resetting
export const setErrorAtom = atom(
  null, // no read value
  (get, set, error) => {
    set(errorAtom, {
      hasError: true,
      message: error.message || 'An unexpected error occurred',
      code: error.code || 'UNKNOWN_ERROR',
    });
  }
);

export const resetErrorAtom = atom(
  null, // no read value
  (get, set) => {
    set(errorAtom, {
      hasError: false,
      message: '',
      code: '',
    });
  }
);