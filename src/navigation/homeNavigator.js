import React from 'react';
import {View, Platform, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerLeftNavigationButton from '../components/drawerNavigation/drawerNavigation';
import HomeScreen from '../screens/home/HomeScreen';
import TokenManagementTVScreen from '../screens/token/TokenManagementTVScreen';
import DefaultTVScreen from '../screens/television/DefaultTVScreen';
import ReceptionScreen from '../screens/reception/ReceptionScreen';
import TokenSuccessScreen from '../screens/tokenDisplay/TokenSuccessScreen';
import PatientTokenQueueScreen from '../screens/patient/PatientTokenQueueScreen';
import { PatientInfoEditorScreen } from '../screens/patientEditor/PatientInfoEditorReceptionScreen';
import DefaultReceptionScreen from '../screens/noTokenReceptionState/DefaultReceptionScreen';
import {Home} from 'lucide-react-native';

const Stack = createNativeStackNavigator();

const HeaderHomeIcon = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{alignItems: 'center', marginTop: 5, marginLeft: 8}}>
      <Home size={24} color={'#000'} />
    </View>
  </TouchableOpacity>
);

export const HeaderRightProfile = React.memo(() => (
  <DrawerLeftNavigationButton />
));

const HomeNavigator = () => {
  console.log('HomeNavigator');
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => <HeaderRightProfile />,
        headerBackTitle: 'Back',
        headerBackTitleVisible: Platform.OS === 'ios',
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: 'rgb(240, 240, 246)',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          headerTitle: () => <HeaderHomeIcon />,
        })}
      />

      <Stack.Screen
        name="Reception"
        component={ReceptionScreen}
        options={{
          title: 'Patient Registration',
        }}
      />

      <Stack.Screen
        name="DefaultNoTokenReception"
        component={DefaultReceptionScreen}
        options={{title: 'Queue Status'}}
      />

      <Stack.Screen
        name="TokenSuccess"
        component={TokenSuccessScreen}
        options={{
          title: 'Token Issued',
          headerRight: () => null,
        }}
      />

      <Stack.Screen
        name="TokenListing"
        component={PatientTokenQueueScreen}
        options={{
          title: 'Token Queue',
        }}
      />

      <Stack.Screen
        name="DefaultNoTokenTV"
        component={DefaultTVScreen}
        options={{title: 'Tokens'}}
      />

      <Stack.Screen
        name="TokenManagement"
        component={TokenManagementTVScreen}
        options={{title: 'Patients'}}
      />

      <Stack.Screen
        name="PatientInfoEditor"
        component={PatientInfoEditorScreen}
        options={{
          title: 'Edit Patient Record',
          headerRight: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
