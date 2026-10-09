import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAc_8wbNx1xxoomVYeL6me2nB0U4TGqGoQ",
  authDomain: "borjalsharq-39deb.firebaseapp.com",
  projectId: "borjalsharq-39deb",
  storageBucket: "borjalsharq-39deb.firebasestorage.app",
  messagingSenderId: "1026356200114",
  appId: "1:1026356200114:web:ed54969a6656beea39ffab",
  measurementId: "G-WFSC8HN45M"
};

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

// Validate Connection to Firestore
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration.");
    }
  }
}
