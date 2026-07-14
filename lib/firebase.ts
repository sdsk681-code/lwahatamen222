// firebase.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-1PbZ9_iosGT5l7bXWiNNCmkaEikwNrI",
  authDomain: "tahmeen-beker.firebaseapp.com",
  databaseURL: "https://tahmeen-beker-default-rtdb.firebaseio.com",
  projectId: "tahmeen-beker",
  storageBucket: "tahmeen-beker.firebasestorage.app",
  messagingSenderId: "875547234385",
  appId: "1:875547234385:web:14ee88261bb3f3a2cd6870",
  measurementId: "G-RDKYD2W845"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
