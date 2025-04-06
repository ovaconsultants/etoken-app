// navigators/AppNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './homeNavigator';
import CustomDrawerContent from '../components/customNavigationDrawer/customDrawerContent';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition : 'Right',
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.4)',
        sceneContainerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
        drawerStyle: { width: 250 },
      }}
    >
      <Drawer.Screen name="HomeNavigator" component={HomeNavigator}  screenOptions={{ headerBackTitle : 'Back', }}/>
    </Drawer.Navigator>
  );
}