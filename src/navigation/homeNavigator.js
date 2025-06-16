import React from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import TokenListingTVScreen from '../screens/token/TokenListingTVScreen';
import DefaultTVScreen from '../screens/television/DefaultTVScreen';
import ReceptionScreen from '../screens/reception/ReceptionScreen';
import TokenSuccessScreen from '../screens/tokenDisplay/TokenSuccessScreen';
import PatientTokenManagementScreen from '../screens/patient/PatientTokenManagementScreen';
import { PatientInfoEditorScreen } from '../screens/patientEditor/PatientInfoEditorReceptionScreen';
import DefaultReceptionScreen from '../screens/noTokenReceptionState/DefaultReceptionScreen';
import { incrementHomeRefreshKey } from '../atoms/refreshAtoms/homePageRefreshAtom';
import { useSetAtom } from 'jotai';
import { Home } from 'lucide-react-native';
import { fontSize } from '../utils/fontUtils';
import HamburgerIcon from '../components/hamburgerIcon/HamburgerIcon';

const Stack = createNativeStackNavigator();

// const HeaderHomeIcon = ({onPress}) => (
//   <TouchableOpacity onPress={onPress}>
//     <View style={{marginTop: 10, marginLeft: 10, position: 're' , zIndex: 1000 }}>
//       <Home size={24} color={'#000'} />
//     </View>
//   </TouchableOpacity>
// );
export const HeaderRightProfile = React.memo(() => (
  <HamburgerIcon />
));

const HomeNavigator = () => {
  const handleRefresh = useSetAtom(incrementHomeRefreshKey);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => <HeaderRightProfile />,
        headerBackTitle: 'Back',
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: 'rgb(240, 240, 246)',          
        },
      
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}

        options={{
          title: 'Home Screen',
          headerTitle: () => (
            <>
              <Text
                style={{
                  fontSize: fontSize(18),
                  fontWeight: 'bold',
                  color: '#222',
                  textAlign: 'center',
                }}
                numberOfLines={1}
                onPress={handleRefresh}
              >
                Home Screen
              </Text>
            </>),
        }}
      />

      <Stack.Screen
        name="Reception"
        component={ReceptionScreen}
         options={{
          title: 'Patient Registration',
          headerTitle: () => (
            <>
              <Text
                style={{
                  fontSize: fontSize(18),
                  fontWeight: 'bold',
                  color: '#222',
                  textAlign: 'center',
                  width: '100%',
                }}
                numberOfLines={1}
                onPress={handleRefresh}
              >
                Patient Registration
              </Text>
            </>),
        }}
      />

      <Stack.Screen
        name="DefaultNoTokenReception"
        component={DefaultReceptionScreen}
        options={{ title: 'Queue Status' }}
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
        component={PatientTokenManagementScreen}
        options={{
          title: 'Token Queue',
           headerTitle: () => (
            <>
              <Text
                style={{
                  fontSize: fontSize(18),
                  fontWeight: 'bold',
                  color: '#222',
                  textAlign: 'center',
                  width: '100%',
                  height: 40,
                }}
                numberOfLines={1}
                onPress={handleRefresh}
              >
                Token Queue
              </Text>
            </>),
        }}
      />

      <Stack.Screen
        name="DefaultNoTokenTV"
        component={DefaultTVScreen}
        options={{ title: 'Tokens' }}
      />

      <Stack.Screen
        name="TokenManagement"
        component={TokenListingTVScreen}
        options={{
          title: 'Patient Queue',
           headerTitle: () => (
              <Text
                style={{
                  fontSize: fontSize(18),
                  fontWeight: 'bold',
                  color: '#222',
                  textAlign: 'center',
                  width: '200%',
                  height: 40,
                }}
                numberOfLines={1}
                onPress={handleRefresh}
              >
                Patient Queue
              </Text>
),
        }}
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
