// src/navigation/clinicNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClinicScreen from '../screens/clinic/ClinicScreen';
import DoctorClinicScheduleScreen from '../screens/schedule/DoctorClinicScheduleScreen';

const Stack = createNativeStackNavigator();

const ClinicNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Clinic">
      <Stack.Screen
        name="Clinic"
        component={ClinicScreen}
        options={{ title: 'Clinic' }}
      />
      <Stack.Screen
        name="DoctorClinicScheduleScreen"
        component={DoctorClinicScheduleScreen}
        options={{ title: 'Doctor Clinic Schedule' }}
      />
    </Stack.Navigator>
  );
};

export default ClinicNavigator;
