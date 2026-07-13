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

async function examineVisitorData() {
  try {
    const querySnapshot = await getDocs(collection(db, "pays"));
    
    console.log("\n=== Full Visitor Data Examination ===\n");
    
    // Get first visitor with most data
    let selectedVisitor = null;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.ownerName && !selectedVisitor) {
        selectedVisitor = { id: doc.id, ...data };
      }
    });
    
    if (selectedVisitor) {
      console.log(`Examining visitor: ${selectedVisitor.ownerName}`);
      console.log(`ID: ${selectedVisitor.id}\n`);
      console.log("All fields:");
      console.log(JSON.stringify(selectedVisitor, null, 2));
    } else {
      console.log("No visitors found");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

examineVisitorData();
