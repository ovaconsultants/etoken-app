import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userTokenAtom } from '../atoms/authAtoms/authAtom';
import { doctorDetailsAtom } from '../atoms/doctorAtoms/doctorAtom';

const useDebugAtoms = () => {
  const userToken = useAtomValue(userTokenAtom);
  const doctorDetails = useAtomValue(doctorDetailsAtom);

  useEffect(() => {
    console.log('User Token:', userToken);
    console.log('Doctor Details:', doctorDetails);
  }, [userToken, doctorDetails]); // Logs whenever values change
};

export default useDebugAtoms;
