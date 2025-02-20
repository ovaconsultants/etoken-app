import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './appNavigator';
import DoctorClinicNavigator from './doctorClinicNavigator';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="AppNavigator">
            <Stack.Screen
                name="AppNavigator"
                component={AppNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ClinicNavigator"
                component={DoctorClinicNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
