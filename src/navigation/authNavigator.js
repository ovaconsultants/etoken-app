import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/signIn/SignInScreen';
import SignUpScreen from '../screens/signUp/SignUpScreen';
import CaptureProfilePhotoScreen from '../screens/profilePicture/CaptureProfilePhotoScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen
        name="AddProfilePicture"
        component={CaptureProfilePhotoScreen}
        options={{ title: 'Take a picture' }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
