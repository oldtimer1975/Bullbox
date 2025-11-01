import * as Localization from "expo-localization";
const I18n = require("i18n-js");

I18n.translations = {
  en: {
    profile: "My Account",
    loggedInAs: "Logged in as",
    logout: "Logout",
  },
  hu: {
    profile: "Fiókom",
    loggedInAs: "Bejelentkezve:",
    logout: "Kijelentkezés",
  },
  de: {
    profile: "Mein Konto",
    loggedInAs: "Eingeloggt als",
    logout: "Abmelden",
  },
  he: {
    profile: "החשבון שלי",
    loggedInAs: "מחובר כ",
    logout: "התנתק",
  },
};

I18n.locale = Localization.locale;
I18n.fallbacks = true;

module.exports = I18n;
