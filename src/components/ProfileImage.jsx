import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetAtom } from 'jotai';
import { userTokenAtom } from '../atoms/authAtoms/authAtom';
import FastImage from 'react-native-fast-image';
import { User, Calendar, PlusCircle, LogOut } from 'lucide-react-native';

const ProfileCircle = ({ imageUrl }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const setUserTokenAtom = useSetAtom(userTokenAtom);

  const options = [
    { label: 'Profile', icon: <User size={18} color="#333" /> },
    { label: 'Clinic', icon: <PlusCircle size={18} color="#333" /> },
    { label: 'Schedule', icon: <Calendar size={18} color="#333" /> },
  ];

  const handleSignOut = async () => {
    setUserTokenAtom(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('doctor_id');
    await AsyncStorage.removeItem('doctor_info');
    await AsyncStorage.removeItem('clinic_details');
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    if (isDropdownVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setDropdownVisible(false));
    } else {
      setDropdownVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={styles.profileImageContainer}>
          <FastImage 
            source={{ uri: imageUrl }} 
            style={styles.profileImage} 
            resizeMode="cover" 
          />
        </View>
      </TouchableOpacity>

      <Modal transparent visible={isDropdownVisible} onRequestClose={toggleDropdown}>
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <View style={styles.dropdown}>
              {options.map((option) => (
                <TouchableOpacity 
                  key={option.label} 
                  style={styles.option}
                  onPress={toggleDropdown}
                >
                  {option.icon}
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
              <View style={styles.divider} />
              <TouchableOpacity 
                style={styles.option}
                onPress={handleSignOut}
              >
                <LogOut size={18} color="#D32F2F" />
                <Text style={[styles.optionText, styles.signOutText]}>Sign Out</Text>
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
    position: 'relative',
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
  },
  dropdown: {
    width: 160,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  signOutText: {
    color: '#D32F2F',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 4,
  },
});

export default ProfileCircle;