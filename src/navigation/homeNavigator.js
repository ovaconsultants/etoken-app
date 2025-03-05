import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import TokenManagementScreen from '../screens/token/TokenManagementScreen';
import NoTokenTVScreen from '../screens/television/DefaultTVScreen';
import ReceptionScreen from '../screens/reception/receptionScreen';
import PatientsScreen from '../screens/PatientsScreen/PatientsScreen';
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
      name="Reception"
        component={ReceptionScreen}
        options={{ title: 'Reception' }}
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
      <Stack.Screen
      name="PatientScreen"
        component={PatientsScreen}
        options={{ title: 'Patient Screen' }}
      />     
    </Stack.Navigator>
  );
};

export default HomeNavigator;
