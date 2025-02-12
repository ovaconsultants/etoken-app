
import { atom } from 'jotai';

// Atom for storing doctor details
export const doctorDetailsAtom = atom({ name: '', email: '', mobile: '' });

// Atom for storing errors related to doctor details
export const doctorErrorAtom = atom(null);
