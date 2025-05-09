import { atom } from 'jotai';

// Atom to store refresh counter (starts at 0)
export const homeRefreshKeyAtom = atom(0);

// Action to increment refresh counter
export const incrementHomeRefreshKey = atom(
  null,
  (get, set) => set(homeRefreshKeyAtom, get(homeRefreshKeyAtom) + 1)
);