import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator from './appNavigator';
import NetworkBanner from '../components/network/networkBanner';
import DoctorClinicNavigator from './doctorClinicNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <>
    <Stack.Navigator initialRouteName="AppNavigator" screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="AppNavigator"
        component={AppNavigator}
      />
      <Stack.Screen
        name="DoctorClinicNavigator"
        component={DoctorClinicNavigator}
      />
    </Stack.Navigator>
    <NetworkBanner />
    </>
  );
};

export default RootNavigator;
