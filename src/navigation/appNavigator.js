import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigator';
import { isAuthenticatedAtom } from '../atoms/authAtoms/authAtom';
import { useAtomValue } from 'jotai';
import HomeNavigator from './homeNavigator';



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const  isLoggedIn = useAtomValue(isAuthenticatedAtom);
return (
        <Stack.Navigator>
            { isLoggedIn ? (
                <Stack.Screen
                    name="HomeNavigator"
                    component={HomeNavigator}
                    options={{ headerShown: false }}
                />
            ) : (
                <Stack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
                options={{ headerShown: false }}
            />
            )}
        </Stack.Navigator>
);
};

export default AppNavigator;
