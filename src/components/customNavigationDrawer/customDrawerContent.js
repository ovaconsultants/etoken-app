// components/CustomDrawerContent.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {User, Calendar, PlusCircle, LogOut} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doctorIdAtom} from '../../atoms/doctorAtoms/doctorAtom';
import {useAtomValue} from 'jotai';
import {userTokenAtom} from '../../atoms/authAtoms/authAtom';
import {useSetAtom} from 'jotai';
const CustomDrawerContent = () => {
  const navigation = useNavigation();
  const doctor_id = useAtomValue(doctorIdAtom);
  const setUserTokenAtom = useSetAtom(userTokenAtom);
  const menuItems = [
    {
      label: 'Profile',
      icon: <User size={20} color="#4A5568" />,
      onPress: () =>
        navigation.navigate('DoctorClinicNavigator', {
          screen: 'AddProfilePicture',
          params: {
            doctor_id: doctor_id,
          },
        }),
    },
    {
      label: 'Schedule',
      icon: <Calendar size={20} color="#4A5568" />,
      onPress: () =>
        navigation.navigate('DoctorClinicNavigator', {
          screen: 'DoctorClinicSchedule',
          params: {
            doctor_id: doctor_id,
          },
        }),
    },
    {
      label: 'Add Clinic',
      icon: <PlusCircle size={20} color="#4A5568" />,
      onPress: () =>
        navigation.navigate('DoctorClinicNavigator', {
          screen: 'DoctorAddClinic',
          params: {
            doctor_id: doctor_id,
          },
        }),
    },
  ];

  const handleSignOut = async () => {
    setUserTokenAtom(null);
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{name: 'AppNavigator'}],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Own Space</Text>
      </View>
      <View style={styles.menuSection}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={item.onPress}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.divider} />
      <TouchableOpacity
        style={[styles.menuItem, styles.signOutButton]}
        onPress={handleSignOut}>
        <View style={styles.iconContainer}>
          <LogOut size={20} color="#E53E3E" />
        </View>
        <Text style={styles.signOutLabel}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#FFF',
  },
  header: {
    marginTop: 36,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
  },
  menuSection: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDF2F7',
    marginVertical: 16,
    marginHorizontal: 24,
  },
  signOutButton: {
    marginTop: 8,
  },
  signOutLabel: {
    fontSize: 16,
    color: '#E53E3E',
    fontWeight: '500',
  },
});

export default CustomDrawerContent;
