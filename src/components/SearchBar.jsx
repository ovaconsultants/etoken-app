import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './SearchBar.styles';
import { getMatchScore } from '../utils/globalUtil';

const SearchBar = ({ data, onSelectItem, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);


  const filteredData = [...(data || [])]
    .map(item => {
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
      const score = getMatchScore(item, searchWords);
      return { ...item, matchScore: score };
    })
    .filter(item => item.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore); // Sort by best match

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBox}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={text => {
          setSearchTerm(text);
          setDropdownVisible(!!text);
        }}
      />
      {dropdownVisible && searchTerm.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.patient_id.toString()}
          style={styles.dropdown}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                onSelectItem(item);
                setSearchTerm('');
                setDropdownVisible(false);
              }}>
              <Text style={styles.dropdownItemText}>
                {item.patient_name} - {item.mobile_number}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>No results found</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SearchBar;
