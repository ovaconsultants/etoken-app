import React, {useEffect, useState, useCallback} from 'react';
import AdRenderer from './AdRenderer';
import {prepareAdMedia} from '../../utils/AdMediaMapper/prepareAdMedia';
import {FetchActiveAdvertisement} from '../../services/advertisementService';

const AdWithRotation = ({doctor_id, clinic_id, hasInProgressPatient}) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [ads, setAds] = useState([]);
  const showAds = !hasInProgressPatient && ads.length > 0;

  const moveToNextAd = useCallback(() => {
    setCurrentAdIndex(prev => (prev + 1) % ads.length);
  }, [ads.length]);

  const handleVideoEnd = useCallback(() => {
    if (ads[currentAdIndex]?.type === 'video') {
      moveToNextAd();
    }
  }, [currentAdIndex, ads, moveToNextAd]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const fetchedAds = await FetchActiveAdvertisement({
          doctor_id,
          clinic_id,
        });
        setAds(prepareAdMedia(fetchedAds));
        setCurrentAdIndex(0);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    fetchAds();
  }, [clinic_id, doctor_id]);

  useEffect(() => {
    if (!showAds || ads[currentAdIndex]?.type !== 'image') {
      return;
    }

    const interval = setInterval(moveToNextAd, 5000);
    return () => clearInterval(interval);
  }, [showAds, currentAdIndex, ads, moveToNextAd]);

  if (!showAds) {
    return null;
  }

  return <AdRenderer media={ads[currentAdIndex]} onEnd={handleVideoEnd} />;
};

export default AdWithRotation;
