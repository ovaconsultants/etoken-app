import React, { useEffect, useState } from 'react';
import {
  View,
  Text,

  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { styles } from './TokenManagementScreen.styles';
import Orientation from 'react-native-orientation-locker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { usePatientTokens } from '../../hooks/usePatientTokens';
import InProgressTokenNotificationScreen from '../notification/InProgressTokenNotificationScreen';
import Draggable from '../../components/Draggable';
import AdWithRotation from '../../components/advertisement/AdRotation';
import { TokenTable } from './TokenTable';
import { useNavigation } from '@react-navigation/native';
// Query client for React Query
const queryClient = new QueryClient();

// Main TokenManagement component
const TokenManagement = ({ route }) => {
  const navigation = useNavigation();

  const { doctor_id, clinic_id } = route.params;
  const { data: tokens = [], isLoading, isError } = usePatientTokens(doctor_id, clinic_id);
  const [inProgressPatient, setInProgressPatient] = useState(null);

  // Find the in-progress patient
  useEffect(() => {
    Orientation.lockToLandscape();
    navigation.setOptions({ headerShown: false });
    const inProgress = tokens.find((token) => token.status === 'In Progress');
    setInProgressPatient(inProgress || null);
    return () => {
      Orientation.lockToPortrait();
      navigation.setOptions({ headerShown: true });
    };
  }, [navigation, tokens]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Error state
  if (isError) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Error loading tokens.</Text>
      </View>
    );
  }

  // No tokens available - display ads/images/videos
  if (!tokens || tokens.length === 0) {
    return   <AdWithRotation />
  }

  // Render token table and in-progress notification
  return (
    <View style={styles.fullScreenContainer}>
      <TokenTable tokens={tokens} />
      <GestureHandlerRootView>
        <Draggable>
          <View style={styles.notificationInProgress}>
           {inProgressPatient && <InProgressTokenNotificationScreen inProgressPatient={inProgressPatient} />}
          </View>
        </Draggable>
      </GestureHandlerRootView>
    </View>
  );
};

// Main screen component with orientation handling
const TokenManagementScreen = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.fullScreenContainer}>
        <TokenManagement {...props} />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default TokenManagementScreen;
