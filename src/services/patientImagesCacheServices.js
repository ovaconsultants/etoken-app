// services/patientImagesCacheServices.js
import {GetPatientProfileImageRequest} from './profileImageService';

const imageCache = new Map();
const pendingRequests = new Map();

export const getPatientImage = async (doctorId, patientId) => {
  if (!doctorId || !patientId) {
    throw new Error('Both doctorId and patientId are required to fetch the image.');
  }
  const cacheKey = `${doctorId}_${patientId}`;

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const requestPromise = GetPatientProfileImageRequest(doctorId, patientId)
    .then(imageUrl => {
      if (imageUrl) {
        imageCache.set(cacheKey, imageUrl);
      }
      pendingRequests.delete(cacheKey);
      return imageUrl;
    })
    .catch(error => {
      pendingRequests.delete(cacheKey);
      return null;
    });

  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
};

export const prefetchPatientImages = async (doctorId, patientIds) => {
  const results = {};

  await Promise.all(
    patientIds.map(async patientId => {
      try {
        const url = await getPatientImage(doctorId, patientId);
        results[patientId] = url;
      } catch (error) {
        results[patientId] = null;
      }
    }),
  );
  console.log(`Prefetched images for doctor_id=${doctorId}:`, results);
  return results;
};
