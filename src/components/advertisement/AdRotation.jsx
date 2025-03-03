// AdRotation.js
import React, {useEffect, useState} from 'react';
import AdRenderer from './AdRenderer';
import {AddMedia} from '../../constants/advertisementsInfo/adMediaConfig';

const AdWithRotation = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Function to move to the next ad
  const moveToNextAd = () => {
    setCurrentAdIndex(prevIndex => (prevIndex + 1) % AddMedia.length);
  };

  // Handle video completion
  const handleVideoEnd = () => {
    if (AddMedia[currentAdIndex].type === 'video') {
      moveToNextAd();
    }
  };

  // Rotate ads only if no tokens are available
  useEffect(() => {
    // For image ads, rotate every 10 seconds
    if (AddMedia[currentAdIndex].type === 'image') {
      const interval = setInterval(() => {
        moveToNextAd();
      }, 10000); // Rotate image ads every 10 seconds

      return () => clearInterval(interval);
    }
  }, [currentAdIndex]);

  return (
    <AdRenderer
      media={AddMedia[currentAdIndex]}
      onEnd={handleVideoEnd} // Pass the onEnd callback
    />
  );
};

export default AdWithRotation;
