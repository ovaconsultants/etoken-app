import { StyleSheet } from 'react-native';
import { width, height } from './TokenSuccessScreen'; // Import screen dimensions

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width, // Take full width
    height: height, // Take full height
  },
  content: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 5,
  },
  detailValue: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  tokenContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white background
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
  },
  tokenText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#4CAF50', // Green button
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});