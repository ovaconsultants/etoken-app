import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Keyboard,
  Platform,
} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import {calculateSearchRelevance} from '../../utils/globalUtil';
import {useOrientation} from '../../hooks/useOrientation';
import {createStyles} from './SearchBar.styles';
import Fuse from 'fuse.js';

const searchName = (query, list) => {
  const options = {
    keys: ['patient_name'],   // Use 'patient_name' as it matches your data
    threshold: 0.4,
    includeScore: true,
  };

  const fuse = new Fuse(list, options);
  const results = fuse.search(query);
  return results.map(result => result.item);
};

const CustomSearchBar = ({
  data,
  onSelectItem,
  dropdownVisible,
  setDropdownVisible,
  placeholder
}) => {
  const {isLandscape} = useOrientation();
  const styles = createStyles(isLandscape);

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [, setKeyboardHeight] = useState(0);

  // Keyboard listeners
  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => setKeyboardHeight(e.endCoordinates.height),
    );
    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  // Filter data based on search term
const filteredData = React.useMemo(() => {
  if (!searchTerm) {return data || [];}
  return searchName(searchTerm, data || []);
}, [searchTerm, data]);

  // Handlers
  const handleSearchChange = text => {
    setSearchTerm(text);
    setDropdownVisible(true);
  };

  const handleItemSelect = item => {
    onSelectItem(item);
    setSearchTerm('');
    setDropdownVisible(false);
    Keyboard.dismiss();
  };

  const handleSearchPress = () => {
    setDropdownVisible(prev => !prev);
    if (!dropdownVisible) {
      setSearchTerm('');
    }
  };

  const handleClearPress = () => {
    setSearchTerm('');
    setDropdownVisible(true); // Keep dropdown open after clear
  };

  return (
    <View style={styles.container}>
      <SearchBar
        iconColor="#3498db"
        cancelIconColor="#e74c3c"
        backgroundColor="#ffffff"
        placeholder={placeholder}
        placeholderTextColor="#95a5a6"
        onChangeText={handleSearchChange}
        onClearPress={handleClearPress}
        onPress={handleSearchPress}
        value={searchTerm}
        style={styles.searchBar}
        textInputStyle={styles.textInput}
        searchIconImageStyle={styles.searchIcon}
        clearIconImageStyle={styles.clearIcon}
      />

      {dropdownVisible && (
        <View style={[styles.dropdownContainer, {maxHeight: 500}]}>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.patient_id.toString()}
            keyboardShouldPersistTaps="always"
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleItemSelect(item)}>
                <View style={styles.tile}>
                  <View style={styles.row}>
                    <Text style={styles.label}>
                      <Text style={styles.bold}>Name:</Text> {item.patient_name}
                    </Text>
                    <Text style={styles.label}>
                      <Text style={styles.bold}>Age:</Text> {item.age || 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>
                      <Text style={styles.bold}>Mobile:</Text>{' '}
                      {item.mobile_number}
                    </Text>
                    <Text style={styles.label}>
                      <Text style={styles.bold}>Area:</Text>{' '}
                      {item.area || 'N/A'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  {searchTerm
                    ? 'No matching patients found'
                    : 'No patients available'}
                </Text>
              </View>
            }
            contentContainerStyle={styles.dropdownContent}
          />
        </View>
      )}
    </View>
  );
};

export default CustomSearchBar;
