import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Platform,
  PixelRatio,
  Keyboard,
} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import {calculateSearchRelevance} from '../../utils/globalUtil';

// Responsive sizing functions
const {width, height} = Dimensions.get('window');
const scale = size => (width / 375) * size;
const fontScale = size => size * PixelRatio.getFontScale();

const CustomSearchBar = ({data, onSelectItem}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => setKeyboardHeight(e.endCoordinates.height),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const filterList = async text => {
    setSearchTerm(text);
    setLoading(true);
    setDropdownVisible(!!text);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    setLoading(false);
  };

  const filteredData = [...(data || [])]
    .map(item => {
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
      const score = calculateSearchRelevance(item, searchWords);
      return {...item, matchScore: score};
    })
    .filter(item => item.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  const handleItemSelect = item => {
    onSelectItem(item);
    setSearchTerm('');
    setDropdownVisible(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          height={scale(30)}
          fontSize={fontScale(16)}
          fontColor="#2c3e50"
          iconColor="#3498db"
          shadowColor="rgba(52, 152, 219, 0.3)"
          cancelIconColor="#e74c3c"
          backgroundColor="#ffffff"
          spinnerVisibility={false}
          placeholder="Search by Patient, Mobile, or Email"
          placeholderTextColor="#95a5a6"
          onChangeText={filterList}
          onClearPress={() => {
            setSearchTerm('');
            setDropdownVisible(false);
          }}
          onPress={() => setDropdownVisible(true)}
          value={searchTerm}
          style={styles.searchBar}
          textInputStyle={styles.textInput}
          searchIconImageStyle={styles.searchIcon}
          clearIconImageStyle={styles.clearIcon}
        />
      </View>

      {dropdownVisible && (
        <View
          style={[
            styles.dropdownContainer,
            {maxHeight: height * 0.4 - keyboardHeight},
          ]}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#3498db" />
            </View>
          ) : (
            <FlatList
              data={filteredData}
              keyExtractor={item => item.patient_id.toString()}
              keyboardShouldPersistTaps="always"
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleItemSelect(item)}>
                  <View style={styles.itemContent}>
                    <Text style={styles.patientName}>{item.patient_name}</Text>
                    <Text style={styles.patientPhone}>{item.mobile_number}</Text>
                  </View>
                  <View style={styles.separator} />
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>No patients found</Text>
                </View>
              }
              contentContainerStyle={styles.dropdownContent}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchBarContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 100,
    shadowColor: '#3498db',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  searchBar: {
    width: '100%',
    borderRadius: scale(8),
    borderColor: '#dfe6e9',
    height : scale(50),
  },
  textInput: {
    paddingVertical: Platform.select({ios: '2%', android: '1%'}),
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
  },
  clearIcon: {
    width: scale(18),
    height: scale(18),
    padding : scale(1),
    marginRight : scale(3),
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
    borderRadius: scale(8),
    zIndex: 99,
    marginTop: '1%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    fontSize: fontScale(15),
    fontWeight: '500',
    flex: 1,
  },
  patientPhone: {
    color: '#7f8c8d',
    fontSize: fontScale(13),
    marginLeft: '3%',
  },
  separator: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginTop: '3%',
  },
  loadingContainer: {
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsContainer: {
    padding: '5%',
    alignItems: 'center',
  },
  noResultsText: {
    color: '#95a5a6',
    fontSize: fontScale(14),
  },
});

export default CustomSearchBar;