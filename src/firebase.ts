import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ PASTE values from Firebase Console here
const firebaseConfig = {
  apiKey: "AIzaSyChARqDOXN_cwkUlayq85tWEZn53l_5d3c",
  authDomain: "grievance-base.firebaseapp.com",
  projectId: "grievance-base",
  storageBucket: "grievance-base.firebasestorage.app",
  messagingSenderId: "25763121296",
  appId: "1:25763121296:web:49a3ce1dfbd163a6b83015",
};

// ✅ Initialize once
const app = initializeApp(firebaseConfig);

// ✅ Export for use across app
export const auth = getAuth(app);
export const db = getFirestore(app);
