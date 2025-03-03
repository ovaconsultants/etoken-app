import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { InterLanguageTranslationRequest } from '../services/langTranslationService';

// Define an atom to store translations
const translationAtom = atom({});

export const useTranslation = (text, sourceLang, targetLang) => {
  const [translations, setTranslations] = useAtom(translationAtom);

  const translationKey = `${text}_${sourceLang}_${targetLang}`;

  useEffect(() => {
    // If translation already exists in the atom, do not fetch again
    if (translations[translationKey]) {return;}

    const translate = async () => {
      try {
        const result = await InterLanguageTranslationRequest(text, sourceLang, targetLang);
        if (result?.trans) {
          setTranslations(prev => ({
            ...prev,
            [translationKey]: result.trans, // Store translation in atom
          }));
        }
      } catch (error) {
        console.error('Translation failed:', error);
      }
    };

    translate();
  }, [text, sourceLang, targetLang, translations, setTranslations, translationKey]);

  return translations[translationKey] || ''; // Return translated text if available
};
