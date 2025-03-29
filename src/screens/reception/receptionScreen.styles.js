import { StyleSheet, Dimensions } from 'react-native';

const { height , width} = Dimensions.get('window');

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
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'space-evenly',
    position: 'absolute',
    bottom: height * 0.03,
    left: width * 0.05,
    right: width * 0.05,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,  
  },
  homeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50', // Green color for home
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  viewAllButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF', // Blue color for view all
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  viewAllButtonContainer: {
    position: 'absolute',
    bottom: height * 0.03,
    right: width * 0.05,
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  floatingButtonIcon: {
    color: '#ffffff',
  },
  formContainer: {
    marginBottom: height * 0.1, // Space for floating button
  },
  label: {
    fontSize: width * 0.04,
    color: '#4b5563',
    marginBottom: height * 0.01,
    fontWeight: '500',
  },

});