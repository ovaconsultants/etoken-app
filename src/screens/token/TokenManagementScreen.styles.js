import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: width * 0.02, // Dynamic padding based on screen width
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: width * 0.02,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: height * 0.015, // Scales padding dynamically
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: height * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    paddingHorizontal: width * 0.02, // Dynamic horizontal padding
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    paddingVertical: height * 0.015,
    textAlign: 'center',
    color: '#fff',
    flex: 1,
    fontSize: width * 0.018, // Responsive font size
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableCell: {
    paddingVertical: height * 0.015,
    textAlign: 'center',
    color: '#333',
    flex: 1,
    fontSize: width * 0.017,
  },
});
