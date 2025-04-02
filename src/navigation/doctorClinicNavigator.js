// src/navigation/clinicNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClinicScreen from '../screens/clinic/ClinicScreen';
import DoctorClinicScheduleScreen from '../screens/schedule/DoctorClinicScheduleScreen';

const Stack = createNativeStackNavigator();

const DoctorClinicNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Clinic">
      <Stack.Screen
        name="Clinic"
        component={ClinicScreen}
        options={{ title: 'Add Clinic' }}
      />
      <Stack.Screen
        name="DoctorClinicSchedule"
        component={DoctorClinicScheduleScreen}
        options={{ title: 'Doctor Clinic Schedule' }}
      />
    </Stack.Navigator>
  );
};

export default DoctorClinicNavigator;
