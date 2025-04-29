import {StyleSheet} from 'react-native';

export const createStyles =  (isLandscape ) => StyleSheet.create({
  searchBarContainer: {
    width: '100%',
    position: 'relative',
  },
  searchBar: {
    width: '100%',
    height:  isLandscape ?  40 :  50, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ccc',
    backgroundColor: '#fff',
    opacity : 0.8 ,
    paddingLeft: '4%',
  },
  textInput: {
    fontSize: 16, 
    color: '#333',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#888',
  },
  clearIcon: {
    width: 18,
    height: 18,
    tintColor: '#888',
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
    borderRadius: 8,
    zIndex: 99,
    marginTop: '1%',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  dropdownItem: {
    paddingVertical: isLandscape ?  5  : '3%',
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
    marginTop: '1%',
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