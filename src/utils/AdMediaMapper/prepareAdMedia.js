import {mediaTypes} from '../../constants/advertisementConfigData/adMediaConfig';
export const prepareAdMedia = apiResponse => {
  return apiResponse.advertisements
    .filter(ad => ad.is_active) // Filter active ads
    .map(ad => {
      return {
        type:
          ad.content_type.toLowerCase() === 'video'
            ? mediaTypes.VIDEO
            : mediaTypes.IMAGE,
        source: {uri: ad.content_url}, // Use URI for remote media
        title: ad.company_name,
        subtitle: `Display Duration: ${ad.display_duration} seconds`,
      };
    });
};
