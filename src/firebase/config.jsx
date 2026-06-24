import { initializeApp } from "firebase/app"

import { getFirestore } from "firebase/firestore"

import { getAuth } from "firebase/auth"

const firebaseConfig = {

  apiKey:
    "AIzaSyAtLqZlGNtI6Y6Cb-M_qjDkx9p5EFylAt8",

  authDomain:
    "mgs-ticket.firebaseapp.com",

  projectId:
    "mgs-ticket",

  storageBucket:
    "mgs-ticket.firebasestorage.app",

  messagingSenderId:
    "502379201015",

  appId:
    "1:502379201015:web:088f997afa9bb0aa0c6ef2",

  measurementId:
    "G-X8HP8D242C"

}

const app =
  initializeApp(firebaseConfig)

export const db =
  getFirestore(app)

export const auth =
  getAuth(app)

export default app
