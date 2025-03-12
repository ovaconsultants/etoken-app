// useOrientationLocker.js
import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';

const useOrientationLocker = (orientation = 'LANDSCAPE') => {
  useEffect(() => {
    // Lock the orientation when the component mounts
    if (orientation === 'LANDSCAPE') {
      Orientation.lockToLandscape();
    } else if (orientation === 'PORTRAIT') {
      Orientation.lockToPortrait();
    }

    // Unlock the orientation when the component unmounts
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, [orientation]);
};

export default useOrientationLocker;
