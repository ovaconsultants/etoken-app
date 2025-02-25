import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import Tts from 'react-native-tts';

const { width , height } = Dimensions.get('window');

const InProgressTokenNotificationScreen = ({ inProgressPatient }) => {
  const theme = useTheme();
  const scaleValue = new Animated.Value(1);
  const isHindiSpoken = useRef(false); // Flag to track if Hindi speech has been triggered

  useEffect(() => {
    // Initialize TTS
    Tts.setDefaultLanguage('en-IN'); // Set default to Indian English
    Tts.setDefaultVoice('com.apple.ttsbundle.Lekha-compact'); // Indian Female English Voice

    // Add event listener for TTS finish
    const ttsFinishListener = Tts.addEventListener('tts-finish', () => {
      console.log('TTS finished speaking');
      if (!isHindiSpoken.current) {
        // Speak in Hindi after English finishes with a 2-second delay
        setTimeout(() => {
          const hindiMessage = `मरीज आईडी: ${inProgressPatient.token_id}, नाम: ${inProgressPatient.patient_name}, स्थिति: ${inProgressPatient.status}, फीस स्थिति: ${inProgressPatient.fee_status}`;
          Tts.speak(hindiMessage, {
            language: 'hi-IN', // Set language to Hindi
            voice: 'com.apple.ttsbundle.Lekha-compact', // Indian Female Hindi Voice
          });
          isHindiSpoken.current = true; // Set flag to true after Hindi speech
        }, 2000);
      }
    });

    // Cleanup event listener on unmount
    return () => {
      ttsFinishListener.remove();
    };
  }, [inProgressPatient]);

  const speakNotification = () => {
    // Reset the flag when the notification is pressed again
    isHindiSpoken.current = false;

    // Speak in English first
    const englishMessage = `Patient ID: ${inProgressPatient.token_id}, Name: ${inProgressPatient.patient_name}, Status: ${inProgressPatient.status}, Fee Status: ${inProgressPatient.fee_status}`;
    Tts.speak(englishMessage, {
      language: 'en-IN', // Ensure English language
      voice: 'com.apple.ttsbundle.Lekha-compact', // Indian Female English Voice
    });

    // Add a subtle animation on press
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      onPress={speakNotification}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Notification for patient ${inProgressPatient.patient_name}`}
    >
      <Animated.View
        style={[
          styles.notificationBox,
          { transform: [{ scale: scaleValue }], backgroundColor: theme.colors.surface },
        ]}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Text style={[styles.tableCell, { color: theme.colors.text }]}>
              🏥 ID: {inProgressPatient.token_id}
            </Text>
            <Text style={[styles.tableCell, { color: theme.colors.text }]}>
              👤 Name: {inProgressPatient.patient_name}
            </Text>
            <Text style={[styles.tableCell, { color: theme.colors.text }]}>
              📊 Status: {inProgressPatient.status}
            </Text>
            <Text style={[styles.tableCell, { color: theme.colors.text }]}>
              💰 Fee Status: {inProgressPatient.fee_status}
            </Text>
          </Card.Content>
        </Card>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    notificationBox: {
      position: 'absolute',
      width: width * 0.3, // 30% of screen width
      height: height * 0.3, // 30% of screen height
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency
      borderRadius: 16, // Rounded edges
      elevation: 8, // Shadow for depth
      shadowColor: '#000',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      padding: width * 0.02, // Responsive padding
    },
    card: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: width * 0.02, // Consistent padding
      borderRadius: 16, // Rounded corners
    },
    tableCell: {
      fontSize: width * 0.018, // Dynamic font size
      marginBottom: 6,
      fontFamily: 'Roboto',
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#333', // Darker text for readability
    },
  });


export default InProgressTokenNotificationScreen;
