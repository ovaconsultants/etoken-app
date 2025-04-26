import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './authNavigator';
import { useAtomValue } from 'jotai';
import { userTokenAtom } from '../atoms/authAtoms/authAtom';
import LoadingErrorHandler from '../screens/token/TokenManagementTVScreen';
import DrawerNavigator from './drawerNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isReady, setIsReady] = React.useState(false);
  const token = useAtomValue(userTokenAtom);

  React.useEffect(() => {
    setTimeout(() => setIsReady(true), 300);
  }, []);

  if (!isReady) return <LoadingErrorHandler isLoading={true} />;

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