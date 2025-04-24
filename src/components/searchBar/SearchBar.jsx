import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
  Platform,
  Keyboard,
} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import {calculateSearchRelevance} from '../../utils/globalUtil';
import { useOrientation } from '../../hooks/useOrientation';
import { createStyles } from './SearchBar.styles';


// Responsive sizing functions
const { height} = Dimensions.get('window');

const CustomSearchBar = ({data, onSelectItem}) => {
  const  { isLandscape } = useOrientation();
  const styles =  createStyles(isLandscape);
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
      <SearchBar
        iconColor="#3498db"
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
        onPress={() => setDropdownVisible(prev => !prev)}
        value={searchTerm}
        style={styles.searchBar}
        textInputStyle={styles.textInput}
        searchIconImageStyle={styles.searchIcon}
        clearIconImageStyle={styles.clearIcon}
      />
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
                    <Text style={styles.patientPhone}>
                      {item.mobile_number}
                    </Text>
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

export default CustomSearchBar;
