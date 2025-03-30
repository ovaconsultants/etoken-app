import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigator';
import { isAuthenticatedAtom } from '../atoms/authAtoms/authAtom';
import { useAtomValue } from 'jotai';
import HomeNavigator from './homeNavigator';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isLoggedIn = useAtomValue(isAuthenticatedAtom);

  // Handle loading state while checking auth
  if (isLoggedIn === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
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