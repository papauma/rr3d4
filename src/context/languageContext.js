import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { MMKV } from 'react-native-mmkv';
import * as RNLocalize from 'react-native-localize';

/**
 * Contexto para manejar literales en toda la aplicación
 */

const LanguageContext = createContext();
const SetLanguageContext = createContext();
const TranslateContext = createContext();

const strings = {
  es: require('@src/resources/i18/es').strings,
  en: require('@src/resources/i18/en').strings,
  ca: require('@src/resources/i18/ca').strings,
  de: require('@src/resources/i18/de').strings,
};

/**
 *
 * @param {el literal a traducir} key
 * @param {lenguaje que se traduce} language
 * Tenemos en cuenta que puede ser un objeto nested como los meses que van asociados a un numero del 1/12
 * Ejemplo en ButtonDateOpenModal
 * @returns
 */
function translate(key, language) {
  const nestedKey = '$#';
  let nestedLanguage = key?.split(nestedKey);
  let literal = null;
  if (!key && !language && !strings[language] && nestedLanguage.length > 0) {
    literal = strings[language][nestedLanguage[0]][nestedLanguage[1]];
  }

  if (literal != null) {
    return literal;
  } else {
    return strings[language][key] || `${language}:${key}`;
  }
}

export function LanguageProvider({children}) {
  const storage = new MMKV();
  const [language, setLanguage] = useState('ca');


  const t = useCallback(key => translate(key, language), [language]);

  /* Obtiene el idioma guardado en local */
  const getStoredLanguage = async () => {
    try {
      let idiomaLocal = storage.getString('userLanguage');
      const lenguaje = idiomaLocal ? idiomaLocal : getLanguage();
      setLanguage(lenguaje);
    } catch (error) {
    }
  };

  /* Modifica el idioma al que se haya cambiado y lo guarda en memoria */
  const setIdioma = async function (lng) {
    setLanguage(lng);
    storage.set('userLanguage', lng);
  };

  /* Inicializar el idioma con el guardado en local */
  useEffect(() => {
    getStoredLanguage();
  }, [language]);

  /* Obtener el idioma a partir del más acorde con el dispositivo del usuario */
  const getLanguage = () => {
    try {
      let lng = RNLocalize.findBestAvailableLanguage(
        Object.keys(strings),
      ).languageTag;
      if (lng !== undefined && lng !== null) {return lng;}
      return 'ca';
    } catch (error) {
      return 'ca';
    }
  };

  return (
    <LanguageContext.Provider value={language}>
      <SetLanguageContext.Provider value={setIdioma}>
        <TranslateContext.Provider value={t}>
          {children}
        </TranslateContext.Provider>
      </SetLanguageContext.Provider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useSetLanguage() {
  return useContext(SetLanguageContext);
}

export function useTranslate() {
  return useContext(TranslateContext);
}
