import { initializeApp } from 'firebase/app';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// Auth imports: web vs native külön kezelése
import { getAuth } from 'firebase/auth';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';

// Csak natív környezetben használjuk ezeket:
let initializeAuth: any;
let getReactNativePersistence: any;
let AsyncStorage: any;
let useNativePersistence = false;

try {
  // dinamikus require azért, hogy weben ne próbáljon meg betölteni natív csomagokat
  // és ne okozzon import hibát a bundlerben.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  initializeAuth = require('firebase/auth').initializeAuth;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  getReactNativePersistence = require('firebase/auth').getReactNativePersistence;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
  // Ha fenti require OK, akkor natív persistence használható
  useNativePersistence = !!(initializeAuth && getReactNativePersistence && AsyncStorage);
} catch (e) {
  // weben ide érünk — semmi teendő, weben a browserLocalPersistence-t használjuk
  useNativePersistence = false;
}

/**
 * Firebase config - használd a saját kulcsaidat ha szükséges
 */
const firebaseConfig = {
  apiKey: "AIzaSyBFI2JAxRkeURJQpUo-ue2axkW92WitFk4",
  authDomain: "bullbox-5cf4e.firebaseapp.com",
  projectId: "bullbox-5cf4e",
  storageBucket: "bullbox-5cf4e.appspot.com",
  messagingSenderId: "686562560716",
  appId: "1:686562560716:web:1d2b4c664dc5cf3c515069",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

// DEBUG: ideiglenes naplózás, ha zavar, vedd ki
try {
  setLogLevel && setLogLevel('debug');
} catch (e) {
  // ignore
}

// Auth export: weben getAuth + browserLocalPersistence, natívan initializeAuth + AsyncStorage
export let auth: any;

if (useNativePersistence) {
  // Native (React Native) környezet: initializeAuth + AsyncStorage persistence
  try {
    auth = initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    // fallback native esetén is, ha valami mégis elromlik
    auth = getAuth(firebaseApp);
  }
} else {
  // Web: getAuth + set browser persistence
  auth = getAuth(firebaseApp);
  // biztosítsuk a local persistence-t weben
  try {
    setPersistence(auth, browserLocalPersistence).catch(() => {
      /* ignore if fails */
    });
  } catch (e) {
    /* ignore */
  }
}

export default firebaseApp;
