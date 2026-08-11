// ==========================================
// MGS TICKET SYSTEM
// FIREBASE CONFIGURATION
// ==========================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyAtLqZlGNtI6Y6Cb-M_qjDkx9p5EFylAt8",
  authDomain: "mgs-ticket.firebaseapp.com",
  projectId: "mgs-ticket",
  storageBucket: "mgs-ticket.firebasestorage.app",
  messagingSenderId: "502379201015",
  appId: "1:502379201015:web:088f997afa9bb0aa0c6ef2",
  measurementId: "G-X8HP8D242C",
};

// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);

// ==========================================
// FIRESTORE
// ==========================================

const db = getFirestore(app);

// ==========================================
// AUTHENTICATION
// ==========================================

const auth = getAuth(app);

// ==========================================
// EXPORT
// ==========================================

export { app, db, auth };

export default app;
