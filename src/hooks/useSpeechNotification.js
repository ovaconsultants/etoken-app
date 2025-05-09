// useSpeechNotification.js
import { useRef, useCallback } from 'react';
import Tts from 'react-native-tts';
import { useTranslation } from './useLangTranslation';

const useSpeechNotification = (inProgressPatient) => {
  const isHindiSpoken = useRef(false);

  // Translate token number and patient name
  const translatedTokenNo = inProgressPatient.token_no;
  const translatedPatientName = useTranslation(`${inProgressPatient.patient_name}`, 'English', 'Hindi');

  // Build English message
  const englishMessage = `Token Number: ${inProgressPatient.token_no}, Token Name: ${inProgressPatient.patient_name}. The doctor has called you; please proceed for your consultation.`;

  // Translate the full English message to Hindi
  const translatedMessageInRegional = useTranslation(englishMessage, 'English', 'Hindi');

  // Return translated data as an object
  const translatedData = {
    translatedTokenNo,
    translatedPatientName,
  };

  // Speak English and Hindi
  const speakMessages = useCallback(() => {
    isHindiSpoken.current = false;

    // Speak English
    Tts.speak(englishMessage, {
      language: 'en-IN',
      iosVoiceId: 'com.apple.ttsbundle.Lekha-compact',
    });

    // Listen for TTS finish event to chain Hindi
    const finishListener = Tts.addEventListener('tts-finish', () => {
      if (!isHindiSpoken.current && translatedMessageInRegional) {
        Tts.speak(translatedMessageInRegional, {
          language: 'hi-IN',
          iosVoiceId: 'com.apple.ttsbundle.Lekha-compact',
        });
        isHindiSpoken.current = true;
      }
    });

    return () => {
      finishListener.remove();
    };
  }, [englishMessage, translatedMessageInRegional]);



  return { speakMessages, translatedData };
};

export default useSpeechNotification;
