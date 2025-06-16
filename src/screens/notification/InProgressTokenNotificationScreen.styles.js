import { StyleSheet, Dimensions } from 'react-native';
import { fontSize, responsiveWidth, responsiveHeight } from '../../utils/fontUtils';

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
  },
  badgeCircle: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: 'rgb(89, 120, 120)',
    alignSelf : 'center',
    borderRadius: 50,
    width: responsiveWidth(50),
    height: responsiveHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  tokenNumber: {
    fontSize: fontSize(30),
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
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: '#2b1b0e',
    textAlign: 'center',
  },
});
