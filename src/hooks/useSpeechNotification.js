import {useRef, useCallback} from 'react';
import Tts from 'react-native-tts';

const useSpeechNotification = (inProgressPatient) => {
  const step = useRef(0);

  const englishMessage = `${inProgressPatient.patient_name} Token Number: ${inProgressPatient.token_no}, The doctor has called you; please proceed for your consultation.`;
  const hindiMessage = `${inProgressPatient.patient_name} Token Number: ${inProgressPatient.token_no}, डॉक्टर ने आपको बुलाया है, कृपया डॉक्टर के पास परामर्श के लिए जाएं।`;

  const speakMessages = useCallback(() => {
    step.current = 0;

    const speakNext = () => {
      if (step.current === 0) {
        Tts.speak(englishMessage, {
          language: 'en-IN',
          iosVoiceId: 'com.apple.ttsbundle.Lekha-compact',
          rate: 0.4,
        });
        step.current++;
      } else if (step.current === 1) {
        Tts.speak(hindiMessage, {
          language: 'hi-IN',
          iosVoiceId: 'com.apple.ttsbundle.Ananya-compact',
          rate: 0.5,
        });
        step.current++;
      }
    };

    const finishListener = Tts.addEventListener('tts-finish', () => {
      speakNext();
    });

    // Start the sequence
    speakNext();

    return () => {
      finishListener.remove();
    };
  }, [englishMessage, hindiMessage]);

  return {speakMessages};
};

export default useSpeechNotification;
