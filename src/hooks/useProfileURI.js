import {doctorInfoAtom} from '../atoms/doctorAtoms/doctorAtom';
import {useAtomValue} from 'jotai';
import {API_URL} from '../config/apiUrl';

export const useProfileURI = () => {
  const doctorInfo = useAtomValue(doctorInfoAtom);

  // Handle undefined/null cases
  if (!doctorInfo?.doctor_profile_pic_directory_api) {
    return ''; // or return a default image URL
  }

  // Clean up paths
  const cleanApiUrl = API_URL?.replace(/\/$/, '') || '';
  const cleanProfilePath = doctorInfo.doctor_profile_pic_directory_api.replace(
    /^\/+/,
    '',
  );

  return `${cleanApiUrl}/${cleanProfilePath}`;
};
