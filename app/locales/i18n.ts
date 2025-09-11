// locales/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import kh from "./kh.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      kh: { translation: kh },
    },
    lng: "en", // ✅ always start with English on both server & client
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    debug: true,
  });
}

export default i18n;
