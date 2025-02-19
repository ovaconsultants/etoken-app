// src/screens/profilePicture/CaptureProfilePhotoScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSetAtom } from 'jotai';
import { isAuthenticatedAtom } from '../../atoms/authAtoms/authAtom';

const CaptureProfilePhotoScreen = () => {
  const navigation = useNavigation();
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);

  const navigateToClinicScreen = () => {
    setIsAuthenticated(true);
    navigation.navigate('ClinicNavigator');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Capture Profile Photo Screen</Text>
      <Button title="Go to Clinic Screen" onPress={navigateToClinicScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default CaptureProfilePhotoScreen;
