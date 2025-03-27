import {doctorInfoAtom} from '../atoms/doctorAtoms/doctorAtom';
import {useAtomValue} from 'jotai';
import {API_URL} from '../config/apiUrl';

export const useProfileURI = () => {
  const doctorInfo = useAtomValue(doctorInfoAtom);
  if (!doctorInfo?.profile_picture_url) {
    return '';
  }
  const cleanApiUrl = API_URL?.replace(/\/$/, '') || '';
  const cleanProfilePath = doctorInfo.profile_picture_url.replace(/^\/+/, '');
  return `${cleanApiUrl}/${cleanProfilePath}`;
};
