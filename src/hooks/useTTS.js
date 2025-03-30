import {useCallback} from 'react';
import Tts from 'react-native-tts';

// Custom hook for TTS functionality
export const useTTS = (message, language, voice) => {
  const speak = useCallback(() => {
    Tts.setDefaultLanguage(language);
    Tts.setDefaultVoice(voice);
    Tts.speak(message);
  }, [message, language, voice]);

  return {speak};
};
