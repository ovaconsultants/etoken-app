import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchBarContainer: {
    width: '100%',
    position: 'relative',
  },
  searchBar: {
    width: '100%',
    height: 55, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ccc',
    backgroundColor: '#fff',
    opacity : 0.8 ,
    paddingLeft: '4%',
  },
  textInput: {
    fontSize: 16, // Match your input font size
    color: '#333', // Match your input text color
    paddingVertical: Platform.select({ios: 0, android: 0}), // Remove extra padding
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#888', // More subtle icon color
  },
  clearIcon: {
    width: 18,
    height: 18,
    tintColor: '#888', // More subtle icon color
  },
  spinnerContainer: {
    position: 'absolute',
    right: '4%',
    top: '30%',
    zIndex: 101,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: (8),
    zIndex: 99,
    marginTop: '1%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  dropdownContent: {
    paddingVertical: '2%',
  },
  dropdownItem: {
    paddingVertical: '3%',
    paddingHorizontal: '4%',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    color: '#2c3e50',
    fontSize: (15),
    fontWeight: '500',
    flex: 1,
  },
  patientPhone: {
    color: '#7f8c8d',
    fontSize: (13),
    marginLeft: '3%',
  },
  separator: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginTop: '3%',
  },
  loadingContainer: {
    padding: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsContainer: {
    padding: '1%',
    alignItems: 'center',
  },
  noResultsText: {
    color: '#95a5a6',
    fontSize: (14),
    fontWeight: '500',
    fontStyle: 'Bold',
  },
});