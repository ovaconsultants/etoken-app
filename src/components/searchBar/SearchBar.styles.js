import {StyleSheet} from 'react-native';

export const createStyles = isLandscape =>
  StyleSheet.create({
    searchBarContainer: {
      width: '100%',
      position: 'relative',
    },
    searchBar: {
      width: '100%',
      height: isLandscape ? 40 : 50,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
      opacity: 0.8,
      paddingLeft: '4%',
    },
    textInput: {
      fontSize: 16,
      color: '#333',
    },
    tile: {
      flexDirection: 'row',
      backgroundColor: '#f9f9f7',
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 8,
    },
    imagePortion: {
      flex: 0.24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailsPortion: {
      flex: 0.7,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    image: {
      width: isLandscape ? 50 : 60,
      height: isLandscape ? 50 : 60,
      borderRadius: isLandscape ? 25 : 30,
      resizeMode: 'cover',
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
      borderWidth: 4,
      borderColor: '#ecf0f1',
      maxHeight: 500,
    },
    dropdownItem: {
      paddingVertical: isLandscape ? 5 : '2%',
    },
    itemContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: '4%',
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
      fontSize: 14,
      fontWeight: '500',
      fontStyle: 'Bold',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    label: {
      fontSize: 16,
      flex: 1,
    },
    bold: {
      fontWeight: 'bold',
    },
  });
