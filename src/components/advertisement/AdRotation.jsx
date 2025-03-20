import React, { useEffect, useState, useCallback } from 'react';
import AdRenderer from './AdRenderer';
import { prepareAdMedia } from '../../utils/AdMediaMapper/prepareAdMedia';
import { FetchActiveAdvertisement } from '../../services/advertisementService';

const AdWithRotation = ({ doctor_id, clinic_id }) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [addMedia, setAddMedia] = useState([]);

  const moveToNextAd = useCallback(() => {
    if (addMedia.length > 0) {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % addMedia.length);
    }
  }, [addMedia.length]);

  const handleVideoEnd = () => {
    if (addMedia.length > 0 && addMedia[currentAdIndex]?.type === 'video') {
      moveToNextAd();
    }
  };

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const fetchedAddMedia = await FetchActiveAdvertisement({ doctor_id, clinic_id });
        const transformedMedia = prepareAdMedia(fetchedAddMedia);
        setAddMedia(transformedMedia);
        setCurrentAdIndex(0);
      } catch (error) {
        console.error('Error fetching advertisement media:', error);
      }
    };

    fetchMedia();
  }, [clinic_id, doctor_id]);

  useEffect(() => {
    if (addMedia.length > 0 && addMedia[currentAdIndex]?.type === 'image') {
      const interval = setInterval(() => {
        moveToNextAd();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [addMedia, currentAdIndex, moveToNextAd]);

  if (addMedia.length === 0) {
    return null;
  }

  return <AdRenderer media={addMedia[currentAdIndex]} onEnd={handleVideoEnd} />;
};

export default AdWithRotation;
