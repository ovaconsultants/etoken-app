import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Footer from './src/components/footer/Footer';
import RootNavigator from './src/navigation/rootNavigator';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="rootNavigator" component={RootNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};

export default App;
