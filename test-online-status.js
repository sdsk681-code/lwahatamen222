const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkOnlineStatus() {
  try {
    const querySnapshot = await getDocs(collection(db, "pays"));
    
    console.log("\n=== Firebase Data Check ===\n");
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.ownerName) {
        console.log(`Visitor: ${data.ownerName}`);
        console.log(`  ID: ${doc.id}`);
        console.log(`  online field: ${data.online}`);
        console.log(`  online type: ${typeof data.online}`);
        console.log(`  lastSeen: ${data.lastSeen}`);
        console.log(`  currentStep: ${data.currentStep}`);
        console.log("---");
      }
    });
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

checkOnlineStatus();
