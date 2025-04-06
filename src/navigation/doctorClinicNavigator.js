// src/navigation/DoctorClinicNavigator.js
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorAddClinicScreen from '../screens/clinic/DoctorAddClinicScreen';
import DoctorClinicScheduleScreen from '../screens/schedule/DoctorClinicScheduleScreen';
import CaptureProfilePhotoScreen from '../screens/profilePicture/CaptureProfilePhotoScreen';
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
            label="Back"
            onPress={() => navigation.goBack()}
          />
        ),
      })}>
      <Stack.Screen
        name="AddProfilePicture"
        component={CaptureProfilePhotoScreen}
        options={{title: 'Take a picture'}}
      />
      <Stack.Screen
        name="DoctorAddClinic"
        component={DoctorAddClinicScreen}
        options={{title: 'Add Clinic'}}
      />
      <Stack.Screen
        name="DoctorClinicSchedule"
        component={DoctorClinicScheduleScreen}
        options={{title: 'Add Clinic Schedule'}}
      />
    </Stack.Navigator>
  );
};

export default DoctorClinicNavigator;
