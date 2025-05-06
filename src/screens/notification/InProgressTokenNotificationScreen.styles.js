import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, } = Dimensions.get('window');

// Helper function to scale font size based on screen width
const scaleFont = (size) => {
  const scaleFactor = SCREEN_WIDTH / 375; // 375 = base width (iPhone 6/7/8)
  return size * scaleFactor;
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    alignItems: 'center',
  },
  badgeCircle: {
    backgroundColor: '#fbbd05',
    borderWidth: 3,
    borderColor: '#d45a00',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  tokenNumber: {
    fontSize: scaleFont(22),
    fontWeight: 'bold',
    color: '#2b1b0e',
  },
  nameCard: {
    marginTop: -40,
    backgroundColor: '#fef5e7',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#d45a00',
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  patientName: {
    paddingTop : 10,
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#2b1b0e',
    textAlign: 'center',
  },
});
