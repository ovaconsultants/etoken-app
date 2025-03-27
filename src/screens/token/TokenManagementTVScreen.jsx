import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {styles} from './TokenManagementTVScreen.styles';
import Orientation from 'react-native-orientation-locker';
import {usePatientTokens} from '../../hooks/usePatientTokens';
import InProgressTokenNotificationScreen from '../notification/InProgressTokenNotificationScreen';
import DefaultTVScreen from '../television/DefaultTVScreen';
import {TokenTable} from './TokenTable';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import {
  doctorClinicDetailsAtom,
  doctorInfoAtom,
} from '../../atoms/doctorAtoms/doctorAtom';
import FastImage from 'react-native-fast-image';
import {useAtomValue} from 'jotai';
import {useProfileURI} from '../../hooks/useProfileURI';
import {RotateCcw} from 'lucide-react-native';
import LoadingErrorHandler from '../../components/LoadingErrorHandler';

const TokenManagementScreen = ({route}) => {
  const profileUri = useProfileURI();
  const clinicData = useAtomValue(doctorClinicDetailsAtom);
  const doctorData = useAtomValue(doctorInfoAtom);
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



  // if isLoading and isError Handler 
  if(isLoading ||  isError) {
    LoadingErrorHandler(isLoading, isError, 'Error loading tokens.');
  }
  if (!tokens || tokens.length === 0) {
    return <DefaultTVScreen clinicInfo={currentClinicData} />;
  }
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

export default withQueryClientProvider(TokenManagementScreen);
