import { atom } from 'jotai';

export const userTokenAtom = atom(null);

export const isAuthenticatedAtom = atom((get) => !!get(userTokenAtom));
