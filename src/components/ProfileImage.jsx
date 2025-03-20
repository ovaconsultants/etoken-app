import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetAtom } from 'jotai';
import { userTokenAtom } from '../atoms/authAtoms/authAtom';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { ProfileIcon,AddClinicIcon ,AddScheduleIcon , LogoutIcon ,UpdateProfileIcon } from './icons/Icons';

const { width } = Dimensions.get('window');

const ProfileCircle = ({ imageUrl }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // For fade animation

  const data = [
    { label: 'Profile', value: 'profile', icon: <ProfileIcon/>},
    { label: 'Add Clinic', value: 'Add Clinic', icon: <AddClinicIcon/> },
    { label: 'Add clinic schedule', value: 'Add clinic schedule', icon: <AddScheduleIcon/> },
    { label: 'Update profile picture', value: 'profile pic', icon: <UpdateProfileIcon /> },
  ];

  const setUserTokenAtom = useSetAtom(userTokenAtom);

  const handleSignOut = () => {
    setUserTokenAtom(null);
    AsyncStorage.removeItem('token');
  };

  const handleSelect = (item) => {
    setDropdownVisible(false);
  };

  const showDropdown = () => {
    setDropdownVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideDropdown = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setDropdownVisible(false));
  };

  return (
    <View style={styles.container}>
      {/* Profile Button */}
      <TouchableOpacity onPress={showDropdown}>
        <LinearGradient colors={['#FFD700', '#FF8C00']} style={styles.gradientBorder}>
          <FastImage source={{ uri: imageUrl }} style={styles.profileImage} resizeMode="cover" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal transparent={true} visible={isDropdownVisible} onRequestClose={hideDropdown}>
        <TouchableWithoutFeedback onPress={hideDropdown}>
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <View style={styles.dropdown}>
              {data.map((item) => (
                <TouchableOpacity key={item.value} onPress={() => handleSelect(item)}>
                  <View style={styles.dropdownItem}>
                    {item.icon}
                    <Text style={styles.dropdownText}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <View style={styles.separator} />
              <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
              <LogoutIcon color="#D32F2F" />
              <Text style={[styles.dropdownText, { color: '#D32F2F' }]}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBorder: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.2) / 2,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    width: 200,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 8,
    position: 'absolute',
    top: 100,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  icon: {
    width: 20,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 8,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default ProfileCircle;