import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {usePatientTokens} from '../../hooks/usePatientTokens';
import {styles} from './TokenManagementScreen.styles';
import InProgressTokenNotificationScreen from '../notification/InProgressTokenNotificationScreen';
import Draggable from '../../components/Draggable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAtom, atom} from 'jotai';

const queryClient = new QueryClient();
const inProgressPatientAtom = atom({
  created_date: '2025-02-10T18:54:19.448Z',
  emergency: 'N',
  fee_amount: '500.00',
  fee_status: 'Not Paid',
  patient_name: 'Alice Johnson',
  patient_profile_picture_url:
    'https://example.com/profile_pictures/johndoe.jpg',
  status: 'In Progress',
  token_id: 1,
  token_no: 1,
});

const TokenManagement = props => {
  const {doctor_id, clinic_id} = props.route.params;
  const {
    data: tokens = [],
    isLoading,
    isError,
  } = usePatientTokens(doctor_id, clinic_id);
  const [inProgessPatient, setInProgressPatient] = useAtom(
    inProgressPatientAtom,
  );

  useEffect(() => {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].status === 'In Progress') {
        setInProgressPatient(tokens[i]);
        break;
      }
    }
  }, [setInProgressPatient, tokens]);
  console.log('Data fetched for pt token in tokenManagement screen', tokens);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Error loading tokens.</Text>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Token No</Text>
            <Text style={styles.tableHeader}>Patient Name</Text>
            <Text style={styles.tableHeader}>Status</Text>
            <Text style={styles.tableHeader}>Fee Status</Text>
            <Text style={styles.tableHeader}>Emergency</Text>
          </View>

          {(tokens ?? []).map(token => (
            <View key={token.token_id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{token.token_no}</Text>
              <Text style={styles.tableCell}>{token.patient_name}</Text>
              <Text style={styles.tableCell}>{token.status}</Text>
              <Text style={styles.tableCell}>{token.fee_status}</Text>
              <Text style={styles.tableCell}>
                {token.emergency === 'Y' ? 'Yes' : 'No'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <GestureHandlerRootView>
        <Draggable>
          <View style={styles.notificationInProgress}>
            <InProgressTokenNotificationScreen
              inProgressPatient={inProgessPatient}
            />
          </View>
        </Draggable>
      </GestureHandlerRootView>
    </View>
  );
};

const TokenManagementScreen = props => {
  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <ScrollView vertical>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.fullScreenContainer}>
          <TokenManagement {...props} />
        </SafeAreaView>
      </QueryClientProvider>
    </ScrollView>
  );
};

export default TokenManagementScreen;
