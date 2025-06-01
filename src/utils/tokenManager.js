// src/utils/tokenManager.js
import httpClient from '../services/apiProvider';
import Tts from 'react-native-tts';

export const setAuthToken = (token) => {
  console.log('setting the auth token' , token);
  if (token) {
    httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete httpClient.defaults.headers.common.Authorization;
  }
};


export function speakNotification(patient_name, token_no) {
  let step = 0;

  const englishMessage = `${patient_name} Token Number: ${token_no}, The doctor has called you; please proceed for your consultation.`;
  const hindiMessage = `${patient_name} Token Number: ${token_no}, डॉक्टर ने आपको बुलाया है, कृपया डॉक्टर के पास परामर्श के लिए जाएं।`;

  const speakNext = () => {
    if (step === 0) {
      Tts.speak(englishMessage, {
        language: 'en-IN',
        iosVoiceId: 'com.apple.ttsbundle.Lekha-compact',
        rate: 0.4,
      });
      step++;
    } else if (step === 1) {
      Tts.speak(hindiMessage, {
        language: 'hi-IN',
        iosVoiceId: 'com.apple.ttsbundle.Ananya-compact',
        rate: 0.5,
      });
      step++;
    }
  };

  const finishListener = Tts.addEventListener('tts-finish', () => {
    speakNext();
  });

  // Start the speech
  speakNext();

  // Return a cleanup function if needed
  return () => {
    finishListener.remove();
  };
}

