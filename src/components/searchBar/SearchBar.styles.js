import {StyleSheet, Platform} from 'react-native';

const createStyles = (scale, fontScale) => StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: scale(16),
  },
  searchBarContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 100,
    shadowColor: '#3498db',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchBar: {
    width: '100%',
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: '#dfe6e9',
    height: scale(50),
  },
  textInput: {
    paddingVertical: Platform.select({ios: scale(8), android: scale(4)}),
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
  },
  clearIcon: {
    width: scale(18),
    height: scale(18),
    padding: scale(1),
    marginRight: scale(3),
  },
  spinnerContainer: {
    position: 'absolute',
    right: scale(16),
    top: scale(15),
    zIndex: 101,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: scale(8),
    zIndex: 99,
    marginTop: scale(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  dropdownContent: {
    paddingVertical: scale(8),
  },
  dropdownItem: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    color: '#2c3e50',
    fontSize: fontScale(15),
    fontWeight: '500',
    flex: 1,
  },
  patientPhone: {
    color: '#7f8c8d',
    fontSize: fontScale(13),
    marginLeft: scale(12),
  },
  separator: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginTop: scale(12),
  },
  loadingContainer: {
    padding: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsContainer: {
    padding: scale(20),
    alignItems: 'center',
  },
  noResultsText: {
    color: '#95a5a6',
    fontSize: fontScale(14),
  },
});

export default createStyles;