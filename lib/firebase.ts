// firebase.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  // Paste config here
  apiKey: "AIzaSyCjp5AYtbd-8O9XbcXrN0IBN7AA6ePNCNY",
  authDomain: "tahmeen-s.firebaseapp.com",
  databaseURL: "https://tahmeen-s-default-rtdb.firebaseio.com",
  projectId: "tahmeen-s",
  storageBucket: "tahmeen-s.firebasestorage.app",
  messagingSenderId: "177307488051",
  appId: "1:177307488051:web:9dc5be176e9be630d3b846",
  measurementId: "G-7LQ2P5MC4T"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
