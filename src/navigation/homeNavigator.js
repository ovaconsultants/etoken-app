import React from 'react';
import { View, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerLeftNavigationButton from '../components/profileImage/ProfileImage';
import HomeScreen from '../screens/home/HomeScreen';
import TokenManagementScreen from '../screens/token/TokenManagementTVScreen';
import DefaultTVScreen from '../screens/television/DefaultTVScreen';
import ReceptionScreen from '../screens/reception/ReceptionScreen';
import TokenSuccessScreen from '../screens/tokenDisplay/TokenSuccessScreen';
import PatientTokenQueueScreen from '../screens/patient/PatientTokenQueueScreen';
import { PatientInfoEditorScreen } from '../screens/patientEditor/PatientInfoEditorReceptionScreen';
import DefaultReceptionScreen from '../screens/noTokenReceptionState/DefaultReceptionScreen';
import { Home } from 'lucide-react-native';
import DoctorAddClinicScreen from '../screens/clinic/DoctorAddClinicScreen';

const Stack = createNativeStackNavigator();

const HeaderHomeIcon = () => (
  <View style={{ alignItems: 'center', marginTop: 5, marginLeft: 8 }}>
    <Home size={24} color={'#000'} />
  </View>
);

export const HeaderRightProfile = React.memo(() => (
  <DrawerLeftNavigationButton />
));

const HomeNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => <HeaderRightProfile />,
        headerBackTitle: 'Back',
        headerBackTitleVisible: Platform.OS === 'ios',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: HeaderHomeIcon,
          headerBackVisible: false,
        }}
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
        options={{ title: 'Queue Status' }}
      />

      <Stack.Screen
        name="Clinic"
        component={DoctorAddClinicScreen}
        options={{ title: 'Add Clinic' }}
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
        options={{ title: 'Tokens' }}
      />

      <Stack.Screen
        name="TokenManagement"
        component={TokenManagementScreen}
        options={{ title: 'Patients' }}
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