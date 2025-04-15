import axios from 'axios';
import LanguageToCodeMap from '../utils/languageMap';

export const InterLanguageTranslationRequest = async (text, from, to) => {
  from = LanguageToCodeMap[from];
  to = LanguageToCodeMap[to];
  const options = {
    method: 'POST',
    url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
    headers: {
      'x-rapidapi-key': '22b513e8e5mshd9cbb3f4c408a97p151636jsn56c0f8cb95aa',
      'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      from: from,
      to: to,
      text: text,
    },
  };

  try {
    // const response = await axios.request(options);
    return text;
  } catch (error) {
    console.error(error);
    return error;
  }
};


// Add this function to your translation service file
export const TranslateNameToHindi = async (englishName) => {
  try {
    const translation = await InterLanguageTranslationRequest(englishName, 'English', 'Hindi');
    return translation?.trans || '';
  } catch (error) {
    console.error('Translation error:', error);
    return '';
  }
};