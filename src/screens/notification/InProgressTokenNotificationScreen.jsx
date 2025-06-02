// InProgressTokenNotificationScreen.js
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {styles} from './InProgressTokenNotificationScreen.styles';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import { speakNotification } from '../../utils/tokenManager';

const InProgressTokenNotificationScreen = ({
  inProgressPatient,
  isLoading,
  isError,
  error,
}) => {
  const theme = useTheme();
  // Trigger speech when inProgressPatient changes
  useEffect(() => {
    if (inProgressPatient.status === 'In Progress') {
      speakNotification(inProgressPatient?.patient_name, inProgressPatient?.token_no);
    }
    return () => {};
  },[inProgressPatient]);

  if (!inProgressPatient) {
    return (
      <View style={styles.container}>
        <Text style={[styles.noTokenText, {color: theme.colors.text}]}>
          No token available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LoadingErrorHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        isLandscape={true}
      />

      {/* Notification Card */}
      <View style={styles.cardWrapper}>
        <View style={styles.badgeCircle}>
          <Text style={styles.tokenNumber}>{inProgressPatient.token_no}</Text>
        </View>

        <View style={styles.nameCard}>
          <Text style={styles.patientName}>
            {inProgressPatient.patient_name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InProgressTokenNotificationScreen;
