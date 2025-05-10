import {doctorInfoAtom} from '../atoms/doctorAtoms/doctorAtom';
import {useAtomValue} from 'jotai';
import {API_URL} from '../constants/globalConstants';

export const useProfileURI = () => {
  const doctorInfo = useAtomValue(doctorInfoAtom);
  if (!doctorInfo?.profile_picture_url) {
    return '';
  }
  return `${API_URL}/${doctorInfo.profile_picture_url}`;
};
