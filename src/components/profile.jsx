import React, { useState } from 'react';
import { View, Text ,StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';


import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ProfileCircle = ({ imageUrl }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const data = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Logout', value: 'logout' },
  ];

  const handleSelect = (item) => {
    console.log(`✅ Selected: ${item.value}`);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Profile Button */}
      <TouchableOpacity onPress={() => setDropdownVisible(!isDropdownVisible)}>
        <LinearGradient colors={['#FFD700', '#FF8C00']} style={styles.gradientBorder}>
          <FastImage source={{ uri: imageUrl }} style={styles.profileImage} resizeMode="cover" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          {data.map((item) => (
            <TouchableOpacity key={item.value} onPress={() => handleSelect(item)}>
              <View style={{ padding: 10 }}>
                <Text>{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  gradientBorder: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileImage: {
    width: '90%',
    height: '90%',
    borderRadius: 999,
    backgroundColor: '#f0f0f0',
  },
  dropdown: {
    width: 160,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    position: 'absolute',
    top: 65,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});


export default ProfileCircle;
