import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const DEFAULT_LOGO_URL = '/logo.webp';
const STORAGE_KEY = 'borj_alsharq_custom_logo';
const SETTINGS_DOC_PATH = 'settings/site';

/**
 * Update browser tab favicon dynamically
 */
export function updateBrowserFavicon(url: string) {
  if (typeof document === 'undefined') return;
  try {
    const existingIcons = document.querySelectorAll("link[rel*='icon']");
    if (existingIcons.length > 0) {
      existingIcons.forEach((el) => {
        (el as HTMLLinkElement).href = url;
      });
    } else {
      const link = document.createElement('link');
      link.type = 'image/webp';
      link.rel = 'shortcut icon';
      link.href = url;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  } catch (e) {
    console.warn('Could not update browser tab icon:', e);
  }
}

/**
 * Resize and compress an uploaded image file into a clean, lightweight data URL
 */
export async function processUploadedLogoFile(file: File, maxWidth = 600): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's an SVG, read as text / data URL directly
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as WebP or PNG with high quality
        const dataUrl = canvas.toDataURL('image/webp', 0.92);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Subscribe to the official logo from Firestore with fallback to localStorage & /logo.svg
 */
export function subscribeToStoreLogo(onLogoChange: (url: string) => void): () => void {
  const triggerChange = (url: string) => {
    updateBrowserFavicon(url);
    onLogoChange(url);
  };

  // 1. Initial cached value
  let currentLogo = DEFAULT_LOGO_URL;
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      currentLogo = cached;
      triggerChange(cached);
    } else {
      triggerChange(DEFAULT_LOGO_URL);
    }
  }

  // 2. Real-time Firestore sync
  try {
    const docRef = doc(db, 'settings', 'site');
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && data.logoUrl) {
            currentLogo = data.logoUrl;
            if (typeof window !== 'undefined') {
              try {
                localStorage.setItem(STORAGE_KEY, data.logoUrl);
              } catch (e) {
                console.warn('LocalStorage quota exceeded for logo cache:', e);
              }
            }
            triggerChange(data.logoUrl);
            return;
          }
        }
        // If document doesn't specify logoUrl, check localStorage or default
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(STORAGE_KEY);
          triggerChange(cached || DEFAULT_LOGO_URL);
        }
      },
      (error) => {
        console.warn('Firestore settings listener error (falling back to local cache):', error);
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(STORAGE_KEY);
          triggerChange(cached || DEFAULT_LOGO_URL);
        }
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Could not set up Firestore logo listener:', err);
    return () => {};
  }
}

/**
 * Save custom logo permanently to Firestore & localStorage
 */
export async function saveLogoPermanently(logoUrl: string): Promise<void> {
  // Always update local cache first for instant feedback
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, logoUrl);
      updateBrowserFavicon(logoUrl);
    } catch (e) {
      console.warn('Could not cache logo in localStorage:', e);
    }
  }

  // Save to Firestore
  try {
    const docRef = doc(db, 'settings', 'site');
    await setDoc(
      docRef,
      {
        id: 'site',
        logoUrl: logoUrl,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
  } catch (firestoreError) {
    console.error('Failed to save logo to Firestore:', firestoreError);
    throw firestoreError;
  }
}

/**
 * Reset logo back to default official logo
 */
export async function resetLogoToDefault(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }

  try {
    const docRef = doc(db, 'settings', 'site');
    await setDoc(
      docRef,
      {
        id: 'site',
        logoUrl: DEFAULT_LOGO_URL,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
  } catch (e) {
    console.warn('Could not reset logo in Firestore:', e);
  }
}
