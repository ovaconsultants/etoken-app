import { StyleSheet } from 'react-native';
import { fontSize } from '../../utils/fontUtils';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

export const createStyles = isLandscape =>
  StyleSheet.create({
    container: {
      width: '100%',
      position: 'relative',
    },
    searchBar: {
      width:isLandscape ? '98.5%' : '100%',
      height: isTablet ? 72 : 48,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
      // opacity: 0.95,
      fontSize: fontSize(14),
     
    },
    textInput: {
      fontSize: fontSize(14),  // match input font from ReceptionScreen
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
    enlargeShowImage: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.9)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalImage: {
      width: '90%',
      height: '70%',
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
      fontSize: fontSize(12),
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    label: {
      fontSize: fontSize(14),
      color: '#000',
      flex: 1,
    },
    bold: {
      fontWeight: 'bold',
    },
  });
