// firebase.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  // Paste config here
  apiKey: "AIzaSyAVpibsrOcFd04Lks2wlVy7n3QFAqYsEas",
  authDomain: "newap-main.firebaseapp.com",
  databaseURL: "https://newap-main-default-rtdb.firebaseio.com",
  projectId: "newap-main",
  storageBucket: "newap-main.firebasestorage.app",
  messagingSenderId: "677147669203",
  appId: "1:677147669203:web:b0eda5cbda40f2b6521a26",
  measurementId: "G-BSHEM91541"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
