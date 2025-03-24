import { StyleSheet, Dimensions } from 'react-native';

// Dynamically get the width of the screen
const { height, width } = Dimensions.get('screen');
const landscapeWidth = 884;

export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    padding: landscapeWidth * 0.02,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: landscapeWidth * 0.02,
    marginBottom: height * 0.02,
  },
  profileCircle: {
    width: height * 0.08,
    height: height * 0.08,
    borderRadius: (height * 0.08) / 2,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: landscapeWidth * 0.03,
    fontWeight: 'bold',
    color: '#fff',
  },
  doctorInfo: {
    flex: 1,
    marginLeft: landscapeWidth * 0.02,
  },
  doctorName: {
    fontSize: landscapeWidth * 0.03,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorQualification: {
    fontSize: landscapeWidth * 0.02,
    color: '#666',
  },
  reloadButton: {
    backgroundColor: '#009BFF',
    paddingVertical: height * 0.01,
    paddingHorizontal: landscapeWidth * 0.02,
    borderRadius: 8,
  },
  reloadButtonText: {
    fontSize: landscapeWidth * 0.02,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: landscapeWidth * 0.02,
  },
  tableRow: {
    width: landscapeWidth / 1.3,
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
  },
  tableHeader: {
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: 'orange',
    paddingVertical: height * 0.015,
    textAlign: 'center',
    color: '#fff',
    flex: 1,
    fontSize: landscapeWidth * 0.018,
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
    bottom: 0.0 * height,
    right: 0.05 * height,
    margin: landscapeWidth * 0.02,
    zIndex: 100,
  },
});