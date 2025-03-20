// TokenManagement.js
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, SafeAreaView} from 'react-native';
import {styles} from './TokenManagementTVScreen.styles';
import Orientation from 'react-native-orientation-locker';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {usePatientTokens} from '../../hooks/usePatientTokens';
import InProgressTokenNotificationScreen from '../notification/InProgressTokenNotificationScreen';
import DefaultTVScreen from '../television/DefaultTVScreen';
import {TokenTable} from './TokenTable';
import {doctorClinicDetailsAtom} from '../../atoms/doctorAtoms/doctorAtom';
import {useAtomValue} from 'jotai';

// Query client for React Query
const queryClient = new QueryClient();

const TokenManagement = ({route}) => {
  const clinicData = useAtomValue(doctorClinicDetailsAtom);
  const {doctor_id, clinic_id} = route.params;
  const {
    data: tokens = [],
    isLoading,
    isError,
  } = usePatientTokens(doctor_id, clinic_id);
  const currentClinicData = clinicData.find(
    clinic => clinic.clinic_id === clinic_id,
  );
  const [inProgressPatient, setInProgressPatient] = useState(null);

  // Find the in-progress patient
  useEffect(() => {
    Orientation.lockToLandscape();
    const inProgress =
      tokens.find(token => token.status === 'In Progress') ||
      tokens.find(token => token.recall === true);
    setInProgressPatient(inProgress || null);
    return () => {
      Orientation.lockToPortrait();
    };
  }, [tokens]);

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
    return <DefaultTVScreen clinicInfo={currentClinicData} />;
  }

  // Render token table and in-progress notification
  return (
    <View style={styles.fullScreenContainer}>
      <TokenTable tokens={tokens} />
      <View style={styles.notificationInProgress}>
        {inProgressPatient && (
          <InProgressTokenNotificationScreen
            inProgressPatient={inProgressPatient}
            isLoading={isLoading}
            isError={isError}
            error={isError ? 'Error loading in-progress patient' : null}
          />
        )}
      </View>
    </View>
  );
};

// Main screen component with orientation handling
const TokenManagementScreen = props => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.fullScreenContainer}>
        <TokenManagement {...props} />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default TokenManagementScreen;
