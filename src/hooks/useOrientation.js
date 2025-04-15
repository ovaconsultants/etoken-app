// hooks/useOrientation.js
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export const useOrientation = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({window}) => {
      setDimensions(window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  return {
    isLandscape: dimensions.width > dimensions.height,
    dimensions,
  };
};
