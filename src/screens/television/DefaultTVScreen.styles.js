import {StyleSheet} from 'react-native';
import { fontSize, responsiveWidth, responsiveHeight, responsiveSize } from '../../utils/fontUtils';

export const creatStyles = (isLandscape, dimension) => {
  const isTablet = dimension.width >= 768;
  return StyleSheet.create({
    container: {
      flexDirection: isLandscape ? 'row' : 'column',
      padding: isTablet ? 32 : 20,
      gap: '3%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    profileImageWrapper: {
      flex: 0.4,
      justifyContent: 'center',
    },

    profileImage: {
    width: '90%',
    aspectRatio: 1, 
    borderRadius: 20,
    },

    infoContainer: {
      flex: isLandscape ? 0.6 : null,
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
    },

    doctorName: {
      fontSize: isTablet ? 34 : 28,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: 4,
    },

    doctorTitle: {
      fontSize: isTablet ? 20 : 16,
      color: '#7f8c8d',
      marginBottom: 10,
    },

    section: {
      marginBottom: 10,
    },

    sectionTitle: {
      fontSize: isTablet ? 20 : 17,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: 8,
    },

    sectionText: {
      fontSize: isTablet ? 16 : 14,
      color: '#2c3e50',
      lineHeight: 22,
    },

    bulletPoint: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 6,
    },

    bulletDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#000',
      marginRight: 10,
      marginTop: 6,
    },

    bulletText: {
      fontSize: isTablet ? 16 : 14,
      color: '#2c3e50',
      flex: 1,
      lineHeight: 22,
    },

    contactItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 6,
    },

    contactIcon: {
      marginRight: 10,
      fontSize: isTablet ? 18 : 16,
      color: '#2c3e50',
    },

    contactText: {
      fontSize: isTablet ? 16 : 14,
      color: '#2c3e50',
      flex: 1,
    },
  });
};
