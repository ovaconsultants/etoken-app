
import { atom } from 'jotai';

// Atom for storing doctor details
export const doctorDetailsAtom = atom(
    {
        doctor_id: 0,
        doctor_name: '',
        clinic_id: 0,
        clinic_name: '',
    }
);

// Atom for storing errors related to doctor details
export const doctorErrorAtom = atom(null);
