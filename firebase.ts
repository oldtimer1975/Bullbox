import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFI2JAxRkeURJQpUo-ue2axkW92WitFk4",
  authDomain: "bullbox-5cf4e.firebaseapp.com",
  projectId: "bullbox-5cf4e",
  storageBucket: "bullbox-5cf4e.appspot.com",
  messagingSenderId: "686562560716",
  appId: "1:686562560716:web:1d2b4c664dc5cf3c515069"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;
