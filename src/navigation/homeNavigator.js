import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useProfileURI} from '../hooks/useProfileURI';
import ProfileCircle from '../components/ProfileImage';
import HomeScreen from '../screens/home/HomeScreen';
import TokenManagementScreen from '../screens/token/TokenManagementTVScreen';
import DefaultTVScreen from '../screens/television/DefaultTVScreen';
import ReceptionScreen from '../screens/reception/ReceptionScreen';
import TokenSuccessScreen from '../screens/tokenDisplay/TokenSuccessScreen';
import PatientTokenQueueScreen from '../screens/patient/PatientTokenQueueScreen';
import { PatientInfoEditorScreen } from '../screens/patientEditor/PatientInfoEditorReceptionScreen';
import DefaultReceptionScreen from '../screens/noTokenReceptionState/DefaultReceptionScreen';
import { Home } from 'lucide-react-native';
// Create stack navigator
const Stack = createNativeStackNavigator();

const HeaderHomeIcon = () => (
  <Home size={30} color={'#000'} />
  );

export const HeaderRightProfile = React.memo(({imageUrl}) => (
  <ProfileCircle imageUrl={imageUrl} />
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
          headerRight: () => <HeaderRightProfile imageUrl={profileUri} />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Reception"
        component={ReceptionScreen}
        options={{title: 'Registration'}}
      />
      <Stack.Screen
        name="DefaultNoTokenReception"
        component={DefaultReceptionScreen}
        options={{title: 'No Active Tokens'}}
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
