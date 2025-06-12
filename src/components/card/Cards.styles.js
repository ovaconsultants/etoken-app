import { StyleSheet } from 'react-native';
import { fontSize } from '../../utils/fontUtils';

export const getCardStyles = (deviceType = 'Mobile', isLandscape = false, cardWidth = '100%') =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: 'rgba(236, 238, 255, 0.7)',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
      position: 'relative',
      overflow: 'hidden',
      marginBottom: 10,
      width: cardWidth,
      padding: deviceType === 'Tablet' ? (isLandscape ? 20 : 18) : 14,
    },
    animatedBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderWidth: 2,
      borderRadius: 10,
    },
    title: {
      fontSize: fontSize(deviceType === 'Tablet' ? 22 : 18),
      fontWeight: 'bold',
      color: '#1E293B',
      textAlign: 'left',
      marginBottom: 6,
      letterSpacing: 0.5,
      alignSelf: 'flex-start',
    },
    description: {
      fontSize: fontSize(deviceType === 'Tablet' ? 18 : 15),
      color: '#555',
      textAlign: 'left',
      lineHeight: fontSize(deviceType === 'Tablet' ? 24 : 21),
      marginBottom: 8,
      fontWeight: '500',
      letterSpacing: 0.3,
      alignSelf: 'flex-start',
    },
  });