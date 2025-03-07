import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  searchBar : {
      zIndex :2 ,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#808080', // A darker shade of grey
    borderWidth: 1, // Optional: Add a border for better distinction
    borderColor: '#666', // Border color to match the button's tone
  },
  buttonText: {
    color: '#333', // Darker text color for better visibility
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },


  viewAllButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  viewAllButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
