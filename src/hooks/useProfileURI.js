import Config from 'react-native-config';
import { doctorInfoAtom } from '../atoms/doctorAtoms/doctorAtom';
import { useAtomValue } from 'jotai';
import { API_URL } from '../config/apiUrl';

export const useProfileURI = () => `${API_URL.replace(/\/$/, '')}/${useAtomValue(doctorInfoAtom).doctor_profile_pic_directory_api.replace(/^\/+/, '')}`;
