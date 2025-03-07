import Config from 'react-native-config';
import { doctorInfoAtom } from '../atoms/doctorAtoms/doctorAtom';
import { useAtomValue } from 'jotai';

export const useProfileURI = () => `${Config.API_BASE_URL.replace(/\/$/, '')}/${useAtomValue(doctorInfoAtom).doctor_profile_pic_directory_api.replace(/^\/+/, '')}`;
