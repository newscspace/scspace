import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./translation.en";
import translationKo from "./translation.ko";

const resource = {
  en: {
    translation: translationEn,
  },
  ko: {
    translation: translationKo,
  },
};
let language = 'ko'
if (navigator.language === 'en-US') {language = 'en';}

i18n.use(initReactI18next).init({
  resources: resource,
  
  lng: language,
  fallbackLng: "ko",

  debug: true,
  keySeparator: ".", // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;