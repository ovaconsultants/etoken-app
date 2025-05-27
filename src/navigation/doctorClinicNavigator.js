// src/navigation/DoctorClinicNavigator.js
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorAddClinicScreen from '../screens/clinic/DoctorAddClinicScreen';
import DoctorClinicScheduleScreen from '../screens/schedule/DoctorClinicScheduleScreen';
import CaptureDoctorProfilePhotoScreen from '../screens/profilePicture/doctor/CaptureDoctorProfilePhotoScreen';
import DoctorEditorScreen from '../screens/doctorEditor/DoctorEditorScreen';
import {HeaderBackButton} from '@react-navigation/elements';

const Stack = createNativeStackNavigator();

const DoctorClinicNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DoctorAddClinic"
      screenOptions={({navigation}) => ({
        headerShown: true,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: props => (
          <HeaderBackButton
            {...props}
            labelVisible={false}
            label=""
            onPress={() => navigation.goBack()}
          />
        ),
      })}>
      <Stack.Screen
        name="AddProfilePicture"
        component={CaptureDoctorProfilePhotoScreen}
        options={{title: 'Profile Picture'}}
      />
      <Stack.Screen
        name="DoctorAddClinic"
        component={DoctorAddClinicScreen}
        options={{title: 'Clinics'}}
      />
      <Stack.Screen
        name="DoctorClinicSchedule"
        component={DoctorClinicScheduleScreen}
        options={{title: 'Clinic Schedule'}}
      />
      <Stack.Screen
        name="DoctorEditor"
        component={DoctorEditorScreen}
        options={{title: 'Edit Profile'}}
      />
    </Stack.Navigator>
  );
};

export default DoctorClinicNavigator;
