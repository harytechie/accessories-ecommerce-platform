// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiDk9H7ePvfhfUahaGf_96XqlsW0YniJk",
  authDomain: "e-commerce-20a14.firebaseapp.com",
  projectId: "e-commerce-20a14",
  storageBucket: "e-commerce-20a14.firebasestorage.app",
  messagingSenderId: "393796978425",
  appId: "1:393796978425:web:2b364a792aca19e6278428",
  measurementId: "G-6SH3EW7HWC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
