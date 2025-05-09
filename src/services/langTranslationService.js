import axios from 'axios';
import LanguageToCodeMap from '../utils/languageMap';

// Helper function to sanitize text
const sanitizeText = text => {
  if (!text) {return '';}
  return text
    .toString()
    .replace(/%/g, '')
    .replace(/[^\w\s\u0900-\u097F]/g, '')
    .trim();
};

export const InterLanguageTranslationRequest = async (text, from, to) => {

  const cleanText = sanitizeText(text);
  if (!cleanText) {return '';}

  from = LanguageToCodeMap[from] || 'en';
  to = LanguageToCodeMap[to] || 'hi';

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
      text: cleanText,
    },
    timeout: 5000,
  };

  try {
    // const response = await axios.request(options);
    return sanitizeText(text || '');
  } catch (error) {
    console.error('Translation API error:', error);
    return '';
  }
};

export const TranslateNameToHindi = async englishName => {
  if (!englishName) {return '';}

  try {
    const cleanName = sanitizeText(englishName);
    if (!cleanName) {return '';}

    const translation = await InterLanguageTranslationRequest(
      cleanName,
      'English',
      'Hindi',
    );

    // Return original name if translation is empty
    return translation || cleanName;
  } catch (error) {
    console.error('Translation service error:', error);
    return englishName; // Fallback to original name
  }
};
