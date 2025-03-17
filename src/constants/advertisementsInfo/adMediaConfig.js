// mediaConfig.js
export const mediaTypes = {
  IMAGE: 'image',
  VIDEO: 'video',
};

export const transformApiResponse = (apiResponse) => {
  return apiResponse.advertisements
    .filter((ad) => ad.is_active) // Filter active ads
    .map((ad) => {
      return {
        type: ad.content_type.toLowerCase() === 'video' ? mediaTypes.VIDEO : mediaTypes.IMAGE,
        source: { uri: ad.content_url }, // Use URI for remote media
        title: ad.company_name,
        subtitle: `Display Duration: ${ad.display_duration} seconds`,
      };
    });
};


export const AddMedia = [
  {
    type: mediaTypes.IMAGE,
    source: require('../../../assets/ads/images/ads_doctor_cardio_john_doe_delhi_v1.jpg'),
    title: 'Dr. John Doe',
    subtitle: 'Cardiologist | Delhi',
  },
  {
    type: mediaTypes.IMAGE,
    source: require('../../../assets/ads/images/ads_doctor_dermatology_mumbai_v1.jpg'),
    title: 'Dr. Jane Smith',
    subtitle: 'Dermatologist | Mumbai',
  },
  {
    type: mediaTypes.VIDEO,
    source: require( '../../../assets/ads/videos/ads_hospital_newTech_showcasing_v1.mp4' ),
    title: 'Mr Hospital',
    subtitle: 'New  edge cutting technology for better healthcare',
  },

];
