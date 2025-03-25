import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {styles} from './TokenManagementTVScreen.styles';
import Orientation from 'react-native-orientation-locker';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {usePatientTokens} from '../../hooks/usePatientTokens';
import InProgressTokenNotificationScreen from '../notification/InProgressTokenNotificationScreen';
import DefaultTVScreen from '../television/DefaultTVScreen';
import {TokenTable} from './TokenTable';
import {
  doctorClinicDetailsAtom,
  doctorInfoAtom,
} from '../../atoms/doctorAtoms/doctorAtom';
import FastImage from 'react-native-fast-image';
import {useAtomValue} from 'jotai';
import {getInitials} from '../../utils/getInitials';
import {useProfileURI} from '../../hooks/useProfileURI';
import {RotateCcw} from 'lucide-react-native';

// Query client for React Query
const queryClient = new QueryClient();

const TokenManagement = ({route}) => {
  const profileUri = useProfileURI();
  console.log('profileUri: ', profileUri);
  const clinicData = useAtomValue(doctorClinicDetailsAtom);
  const doctorData = useAtomValue(doctorInfoAtom);
  const doctorInitials = getInitials(doctorData.doctor_name);
  const {doctor_id, clinic_id} = route.params;
  const {
    data: tokens = [],
    isLoading,
    isError,
  } = usePatientTokens(doctor_id, clinic_id);
  console.log('tokens: ', tokens);
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
      <View style={styles.headerContainer}>
        <View style={styles.doctorSection}>
        <View style={styles.profileCircle}>
          <FastImage
            source={{uri: profileUri}}
            style={styles.profileImage}
            resizeMode="cover"
            fallback={true} 
          />
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>Dr. {doctorData.doctor_name}</Text>
          <Text style={styles.doctorQualification}>
            {doctorData.specialization_name}
          </Text>
        </View>
        </View>
        <TouchableOpacity style={styles.reloadButton}>
          <RotateCcw />
        </TouchableOpacity>
      </View>
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
