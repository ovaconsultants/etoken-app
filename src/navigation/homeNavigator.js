import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useProfileURI} from '../hooks/useProfileURI';
import ProfileCircle from '../components/ProfileImage';
import HomeScreen from '../screens/home/HomeScreen';
import TokenManagementScreen from '../screens/token/TokenManagementScreen';
import DefaultTVScreen from '../screens/television/DefaultTVScreen';
import ReceptionScreen from '../screens/reception/ReceptionScreen';
import TokenSuccessScreen from '../screens/tokenDisplay/TokenSuccessScreen';
import ReceptionAllPatientTokensScreen from '../screens/patient/ReceptionAllPatientTokensScreen';
import {IconButton} from 'react-native-paper';
// Create stack navigator
const Stack = createNativeStackNavigator();

const HeaderHomeIcon = () => (
  <IconButton
    icon="home"
    size={30}
    color="black"
    onPress={() => console.log('Home Pressed')}
  />
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
        name="TokenSuccess"
        component={TokenSuccessScreen}
        options={{title: 'Token Display'}}
      />
      <Stack.Screen
        name="TokenListing"
        component={ReceptionAllPatientTokensScreen}
        options={{title: 'Tokens'}}
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
