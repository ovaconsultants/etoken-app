import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Light gray background
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0', // Light gray border
    borderWidth: 1,
    borderRadius: 12, // Rounded corners
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF', // White background
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
  },
  searchBar: {
    zIndex: 2,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30', // iOS error red
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 12, // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
  },
  clearButton: {
    backgroundColor: '#F5F5F5', // Light gray background
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light gray border
  },
  buttonText: {
    color: '#333', // Dark text
    fontSize: 16,
    fontWeight: '600', // Semi-bold
  },
  submitButton: {
    backgroundColor: '#007AFF', // iOS system blue
  },
  submitButtonText: {
    color: '#FFFFFF', // White text
  },
  viewAllButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  viewAllButton: {
    height: 50,
    borderRadius: 12, // Rounded corners
    backgroundColor: '#007AFF', // iOS system blue
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
  },
  viewAllButtonText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: '600', // Semi-bold
  },
});