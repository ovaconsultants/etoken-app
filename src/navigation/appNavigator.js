import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigator';


const Stack = createNativeStackNavigator();



const AppNavigator = () => {
   const isLoggedIn = false;
return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <Stack.Screen
                    name="Home"
                    component={()=>null}
                    options={{ headerShown: false }}
                />
            ) : (
                <Stack.Screen
                name="Auth"
                component={AuthNavigator}
                options={{ headerShown: false }}
            />
            )}
        </Stack.Navigator>
);
};

export default AppNavigator;
