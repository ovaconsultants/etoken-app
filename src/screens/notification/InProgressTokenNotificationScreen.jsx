import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import { Text,TouchableOpacity, Animated } from 'react-native';
import { useTranslation } from '../../hooks/useLangTranslation';
import { useTTS } from '../../hooks/useTTS';
import { Card, useTheme } from 'react-native-paper';
import Tts from 'react-native-tts';
import { styles } from './InProgressTokenNotificationScreen.styles';




const regionalTranslatedTokenMessage = atom(null);

const InProgressTokenNotificationScreen = ({ inProgressPatient }) => {
  console.log('In Progress Patient: In InProgressTokenNotification', inProgressPatient);
  const [messageInRegional , setMessageInRegional] = useAtom(regionalTranslatedTokenMessage);
  const theme = useTheme();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const isHindiSpoken = useRef(false);

  // Memoized English message
  const englishMessage = useMemo(
    () =>
      `Token Number: ${inProgressPatient.token_no}, Token Name: ${inProgressPatient.patient_name}. The doctor has called you; please proceed for your consultation.`,
    [inProgressPatient]
  );

  // Translated token details
  const translatedTokenId = useTranslation(`Token ID: ${inProgressPatient.token_id}`, 'English', 'Hindi');
  const translatedName = useTranslation(`Token Name: ${inProgressPatient.patient_name}`, 'English', 'Hindi');
  const translatedToken = useMemo(
    () => (translatedTokenId && translatedName ? `${translatedTokenId}, ${translatedName}` : ''),
    [translatedTokenId, translatedName]
  );

  setMessageInRegional(useTranslation(englishMessage, 'English', 'Hindi'));

  console.log('Translated Token:', messageInRegional);
  // TTS functionality
  const { speak: speakEnglish } = useTTS(englishMessage, 'en-IN', 'com.apple.ttsbundle.Lekha-compact');
  const { speak: speakHindi } = useTTS(messageInRegional, 'hi-IN', 'com.apple.ttsbundle.Lekha-compact');

  useEffect(() => {
    Tts.addEventListener('tts-progress', (event) => {
      console.log('TTS Progress:', event);
    });
    const ttsFinishListener = Tts.addEventListener('tts-finish', async () => {
      if (!isHindiSpoken.current && messageInRegional) {
        speakHindi();
        isHindiSpoken.current = true;
      }
    });

    return () => {
      ttsFinishListener.remove();
    };
  }, [messageInRegional, speakHindi]);

  // Handle notification press
  const handleNotificationPress = useCallback(() => {
    isHindiSpoken.current = false;
    speakEnglish();

    // Button press animation
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  }, [speakEnglish, scaleValue]);

  return (
    <TouchableOpacity
      onPress={handleNotificationPress}
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
              🏥 {`Token No: ${inProgressPatient.token_id}`}
            </Text>
            <Text style={[styles.tableCell, { color: theme.colors.text }]}>
              👤 {`Token Name: ${inProgressPatient.patient_name}`}
            </Text>
            <Text style={[styles.tableCell, { color: theme.colors.text }]}>
              🏥 {translatedToken}
            </Text>
          </Card.Content>
        </Card>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default React.memo(InProgressTokenNotificationScreen);
