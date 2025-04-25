import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigator';
import { isAuthenticatedAtom } from '../atoms/authAtoms/authAtom';
import { useAtomValue } from 'jotai';
import { ActivityIndicator, View } from 'react-native';
import LoadingErrorHandler from '../screens/token/TokenManagementTVScreen';
import DrawerNavigator from './drawerNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isLoggedIn = useAtomValue(isAuthenticatedAtom) || undefined ;

  // Handle loading state while checking auth
  if (isLoggedIn === undefined) {
    return (
     <LoadingErrorHandler isLoading={true}/>
    );
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
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