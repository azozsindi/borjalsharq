import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: "AIzaSyAc_8wbNx1xxoomVYeL6me2nB0U4TGqGoQ",
  authDomain: "borjalsharq.firebaseapp.com",
  projectId: "borjalsharq",
  storageBucket: "borjalsharq.firebasestorage.app",
  messagingSenderId: "344606701994",
  appId: "1:344606701994:web:9f92f8aa472f1189eb93d3",
  measurementId: "G-L2DG0QBQQ5"
};

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Google Analytics for borjalsharq
export const initAnalytics = async () => {
  if (typeof window !== 'undefined') {
    try {
      const supported = await isSupported();
      if (supported) {
        return getAnalytics(app);
      }
    } catch (e) {
      console.warn('Firebase Analytics not initialized:', e);
    }
  }
  return null;
};
