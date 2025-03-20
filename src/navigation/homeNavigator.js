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
import DefaultReceptionScreen from '../screens/noTokenReceptionState/DefaultReceptionScreen';
import HomeIcon from '../components/HomeIcon';
// Create stack navigator
const Stack = createNativeStackNavigator();

const HeaderHomeIcon = () => (
<HomeIcon width={32} height={32} color="#4A90E2" />
);

const HeaderRightProfile = React.memo(({imageUrl}) => (
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
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => <HeaderRightProfile imageUrl={profileUri} />,
          headerTitleAlign: 'center', // Center the header title
        }}
      />
      <Stack.Screen
        name="Reception"
        component={ReceptionScreen}
        options={{title: 'Reception'}}
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
        options={{title: 'Token List', headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="DefaultNoTokenTV"
        component={DefaultTVScreen}
        options={{title: 'Tokens'}}
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
