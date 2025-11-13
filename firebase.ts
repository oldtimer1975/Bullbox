import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "./firebaseConfig";

// App egyszeri inicializálása (idempotens)
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth inicializálása RN perzisztenciával
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Ha később kell Firestore / Storage, így tudod bővíteni:
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// export const db = getFirestore(app);
// export const storage = getStorage(app);
