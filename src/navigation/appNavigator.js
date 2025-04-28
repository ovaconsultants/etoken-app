import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigator';
import { useAtomValue } from 'jotai';
import { userTokenAtom } from '../atoms/authAtoms/authAtom';
import DrawerNavigator from './drawerNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isReady, setIsReady] = React.useState(false);
  const token = useAtomValue(userTokenAtom);
  console.log('AppNavigator: token', token);
  React.useEffect(() => {
    setTimeout(() => setIsReady(true), 300);
  }, []);

  if (!isReady) return null ; 

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={token ? 'DrawerNavigator' : 'AuthNavigator'}
        component={token ? DrawerNavigator : AuthNavigator}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator; 