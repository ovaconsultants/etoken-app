import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Keyboard,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import {useOrientation} from '../../hooks/useOrientation';
import {createStyles} from './SearchBar.styles';
import {PrefetchPatientImages} from '../../services/patientImagesCacheServices';

import {getInitials} from '../../utils/getInitials';
import Fuse from 'fuse.js';

const searchName = (query, list) => {
  const options = {
    keys: ['patient_name', 'patient_id', 'mobile_number', 'area'],
    includeMatches: true,
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
  onSelectImageUrl,
  dropdownVisible,
  setDropdownVisible,
  placeholder,
  doctorId,
}) => {
  const {isLandscape} = useOrientation();
  const styles = createStyles(isLandscape);
  console.log('CustomSearchBar data:', data);
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [, setKeyboardHeight] = useState(0);
  const [imageUrls, setImageUrls] = useState({});
  const [loadingImages, setLoadingImages] = useState(false);

  // Fetch all images when dropdown becomes visible
  useEffect(() => {
    const fetchImages = async () => {
      if (!dropdownVisible || !doctorId || !filteredData.length) {
        return;
      }

      setLoadingImages(true);
      try {
        const patientIds = filteredData.map(item => item.patient_id);
        const urls = await PrefetchPatientImages(doctorId, patientIds);
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoadingImages(false);
      }
    };

    fetchImages();
  }, [dropdownVisible, filteredData, doctorId]);
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
    if (!searchTerm) {
      return data || [];
    }
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
    setDropdownVisible(true);
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
        <View style={[styles.dropdownContainer]}>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.patient_id.toString()}
            keyboardShouldPersistTaps="always"
            renderItem={({item}) => {
              const imageUrl = imageUrls[item.patient_id];
              return (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    onSelectImageUrl(imageUrl);
                    handleItemSelect(item);
                  }}>
                  <View style={styles.tile}>
                    {/* Image/Initials Container */}
                    <View style={styles.imagePortion}>
                      {loadingImages ? (
                        <View style={styles.spinnerContainer}>
                          <ActivityIndicator size="small" color="#3498db" />
                        </View>
                      ) : (
                        <Image
                          source={
                            imageUrl
                              ? {uri: imageUrl}
                              : require('../../../assets/patient.png')
                          }
                          style={styles.image}
                          onError={e => {
                            console.log(
                              'Image failed to load:',
                              e.nativeEvent.error,
                            );
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.detailsPortion}>
                      <View style={styles.row}>
                        <Text style={styles.label}>
                          {item.patient_name || 'N/A'}
                        </Text>
                        <Text style={styles.label}>{item.age || 'N/A'}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>{item.mobile_number}</Text>
                        <Text style={styles.label}>{item.area || 'N/A'}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
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
