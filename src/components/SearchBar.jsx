// components/SearchBar.js
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const SearchBar = ({data, onSelectItem, placeholder}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const filteredData = data?.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.patient_name?.toLowerCase().includes(searchLower) ||
      item.mobile_number?.includes(searchTerm) ||
      item.email?.toLowerCase().includes(searchLower)
    );
  });

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



const styles = StyleSheet.create({
  searchContainer: {
    width: wp('90%'), // 90% of screen width
    alignSelf: 'center', // Centers the search bar
    marginBottom: hp('2%'),
    position: 'relative',
    zIndex: 100, // Ensures dropdown is above other elements
  },
  searchBox: {
    width: '100%',
    height: hp('6%'), // Adjusts height dynamically
    fontSize: hp('2%'), // Responsive font size
    color: '#333',
    backgroundColor: '#F0F0F0', // Light gray background like modern apps
    borderRadius: hp('3%'), // Fully rounded for modern look
    paddingHorizontal: wp('4%'), // Spacing inside the input
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3, // Android shadow
  },
  dropdown: {
    position: 'absolute',
    top: hp('6.5%'), // Below input field
    left: 0,
    width: '100%', // Matches input width
    backgroundColor: 'white',
    maxHeight: hp('50%'),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: hp('1%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    zIndex : 2 ,
  },
  dropdownItem: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: hp('2%'),
    color: '#333',
  },
});

  