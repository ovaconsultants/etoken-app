// InProgressTokenNotificationScreen.js
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Card, useTheme} from 'react-native-paper';
import {styles} from './InProgressTokenNotificationScreen.styles';
import LoadingErrorHandler from '../../components/LoadingErrorHandler';
import useSpeechNotification from '../../hooks/useSpeechNotification';


const InProgressTokenNotificationScreen = ({
  inProgressPatient,
  isLoading,
  isError,
  error,
}) => {

  const theme = useTheme();

  // Use the custom hook for speech functionality
  const {speakMessages, translatedData} =
    useSpeechNotification(inProgressPatient);

  // Trigger speech when inProgressPatient changes
  useEffect(() => {
      speakMessages();
      return () => {
      };
  },[inProgressPatient, speakMessages]);

  // If no token is available, show a message
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
      {/* Loa"d"ing and Error Handler */}
      <LoadingErrorHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      {/* Notification Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.tableCell, {color: theme.colors.text}]}>
            🏥 Token No: {inProgressPatient.token_no}
          </Text>
          <Text style={[styles.tableCell, {color: theme.colors.text}]}>
            👤 Token Name: {inProgressPatient.patient_name}
          </Text>
          <Text style={[styles.tableCell, {color: theme.colors.text}]}>
            🏥 {translatedData.translatedTokenNo}
          </Text>
          <Text style={[styles.tableCell, {color: theme.colors.text}]}>
            👤 {translatedData.translatedPatientName}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default React.memo(InProgressTokenNotificationScreen);
