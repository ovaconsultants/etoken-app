import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useProfileURI} from '../hooks/useProfileURI';
import DrawerLeftNavigationButton from '../components/profileImage/ProfileImage';
import HomeScreen from '../screens/home/HomeScreen';
import TokenManagementScreen from '../screens/token/TokenManagementTVScreen';
import DefaultTVScreen from '../screens/television/DefaultTVScreen';
import ReceptionScreen from '../screens/reception/ReceptionScreen';
import TokenSuccessScreen from '../screens/tokenDisplay/TokenSuccessScreen';
import PatientTokenQueueScreen from '../screens/patient/PatientTokenQueueScreen';
import {PatientInfoEditorScreen} from '../screens/patientEditor/PatientInfoEditorReceptionScreen';
import DefaultReceptionScreen from '../screens/noTokenReceptionState/DefaultReceptionScreen';
import {Home} from 'lucide-react-native';
import DoctorAddClinicScreen from '../screens/clinic/DoctorAddClinicScreen';
// Create stack navigator
const Stack = createNativeStackNavigator();

const HeaderHomeIcon = () => (
  <View style={{flex: 1, alignItems: 'center', marginTop: 12}}>
    <Home size={24} color={'#000'} />
  </View>
);

export const HeaderRightProfile = React.memo(() => (
  <DrawerLeftNavigationButton />
));

const HomeNavigator = () => {
  const profileUri = useProfileURI();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: HeaderHomeIcon,
          headerTitleAlign: 'center',
          headerRight: () => <HeaderRightProfile />,
          headerBackVisible: false,
          gestureEnabled: true,
          headerTitleContainerStyle: {
            left: 50, // Adjust these values as needed
            right: 50,
          },
        }}
      />
      <Stack.Screen
        name="Reception"
        component={ReceptionScreen}
        options={{
          title: 'Registration',
          headerRight: () => <HeaderRightProfile />,
        }}
      />
      <Stack.Screen
        name="DefaultNoTokenReception"
        component={DefaultReceptionScreen}
        options={{title: 'No Active Tokens'}}
      />
      <Stack.Screen
        name="Clinic"
        component={DoctorAddClinicScreen}
        options={{title: 'Clinic'}}
      />
      <Stack.Screen
        name="TokenSuccess"
        component={TokenSuccessScreen}
        options={{title: 'Token Display'}}
      />
      <Stack.Screen
        name="TokenListing"
        component={PatientTokenQueueScreen}
        options={{
          headerTitle: '',
          headerRight: () => <HeaderRightProfile imageUrl={profileUri} />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="DefaultNoTokenTV"
        component={DefaultTVScreen}
        options={{title: 'Tokens'}}
      />
      <Stack.Screen
        name="TokenManagement"
        component={TokenManagementScreen}
        options={{title: 'Patients'}}
      />
      <Stack.Screen
        name="PatientInfoEditor"
        component={PatientInfoEditorScreen}
        options={{title: 'Edit Patient Info'}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
