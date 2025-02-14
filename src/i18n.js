import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import az from "./locales/az.json";

function loadLocaleMessages() {
  const locales = [{ en: en }, { az: az }];
  const messages = {};
  locales.forEach((lang) => {
    const key = Object.keys(lang);
    messages[key] = lang[key];
  });
  return messages;
}

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
});
