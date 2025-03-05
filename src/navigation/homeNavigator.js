import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import TokenManagementScreen from '../screens/token/TokenManagementScreen';
import NoTokenTVScreen from '../screens/television/DefaultTVScreen';
const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="NoTokenTV"
        component={NoTokenTVScreen}
        options={{title: 'No Token TV'}}
      />
      <Stack.Screen
        name="TokenManagement"
        component={TokenManagementScreen}
        options={{title: 'Token Management'}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
