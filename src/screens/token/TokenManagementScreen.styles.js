import { StyleSheet, Dimensions } from 'react-native';

// Dynamically get the width of the screen
const { height } = Dimensions.get('screen');
const landscapeWidth = 884;
console.log('landscapeWidth', landscapeWidth);

export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    // backgroundColor: '#000000',
    padding: landscapeWidth * 0.02, // Dynamic padding based on landscape width
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    flexGrow: 1,
    // backgroundColor: 'green',
    paddingHorizontal: landscapeWidth * 0.02,
  },
  tableRow: {
    width: landscapeWidth/1.3,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 12,
    marginVertical: height * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    // paddingHorizontal: landscapeWidth * 0.02, // Dynamic horizontal padding
  },
  tableHeader: {
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: 'orange',
    paddingVertical: height * 0.015,
    textAlign: 'center',
    color: '#fff',
    flex: 1,
    fontSize: landscapeWidth * 0.018, // Responsive font size
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableCell: {
    paddingVertical: height * 0.007,
    textAlign: 'center',
    color: '#333',
    flex: 1,
    fontSize: landscapeWidth * 0.017,
  },
  notificationInProgress: {
    position: 'absolute',
    bottom : 0.00 * height,
    right: 0.05 * height,
    margin: landscapeWidth * 0.02,
    zIndex: 100,
  },
});
