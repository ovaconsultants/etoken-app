import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, } = Dimensions.get('window');

// Helper function to scale font size based on screen width
const scaleFont = (size) => {
  const scaleFactor = SCREEN_WIDTH / 375;
  return size * scaleFactor;
};

export const styles = StyleSheet.create({
  container: {
    flex : 1 ,
    justifyContent: 'center',
  },
  cardWrapper: {
    flex : 1 ,
    justifyContent: 'center',
    backgroundColor : '#fff',
    width: 600,
  },
  badgeCircle: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: 'rgb(89, 120, 120)',
    alignSelf : 'center',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  tokenNumber: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#2b1b0e',
  },
  nameCard: {
    marginTop: -40,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'rgb(141, 170, 170)',
    backgroundColor :  'rgb(231, 233, 233)',
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  patientName: {
    paddingVertical : 20,
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#2b1b0e',
    textAlign: 'center',
  },
});
