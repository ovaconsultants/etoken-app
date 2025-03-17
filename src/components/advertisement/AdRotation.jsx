// AdRotation.js
import React, {useEffect, useState,useCallback} from 'react';
import AdRenderer from './AdRenderer';
import {transformApiResponse} from '../../constants/advertisementsInfo/adMediaConfig';
import {FetchActiveAdvertisement} from '../../services/advertisementService';
const AdWithRotation = ({route}) => {
  const {doctor_id, clinic_id} = route?.params;
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [addMedia, setAddMedia] = useState([null]);

  // Function to move to the next ad
  const moveToNextAd = useCallback(() => {
    setCurrentAdIndex(prevIndex => (prevIndex + 1) % addMedia.length);
  },[addMedia.length]);

  // Handle video completion
  const handleVideoEnd = () => {
    if (addMedia[currentAdIndex].type === 'video') {
      moveToNextAd();
    }
  };

  useEffect(() => {
    const fetchedAddMedia = FetchActiveAdvertisement(doctor_id, clinic_id);
    const AddMedia = transformApiResponse(fetchedAddMedia);
    setAddMedia(AddMedia);
  }, [clinic_id, doctor_id]);

  // Rotate ads only if no tokens are available
  useEffect(() => {
    if (addMedia[currentAdIndex].type === 'image') {
      const interval = setInterval(() => {
        moveToNextAd();
      }, 10000); // Rotate image ads every 10 seconds

      return () => clearInterval(interval);
    }
  }, [addMedia, currentAdIndex, moveToNextAd]);

  return <AdRenderer media={addMedia[currentAdIndex]} onEnd={handleVideoEnd} />;
};

export default AdWithRotation;
