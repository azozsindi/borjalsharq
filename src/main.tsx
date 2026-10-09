import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initAnalytics } from './firebase.ts';

// Initialize Firebase Google Analytics (G-L2DG0QBQQ5)
initAnalytics();

// Prevent ResizeObserver benign loop notification errors from uncaught propagation
window.addEventListener(
  'error',
  (e) => {
    const msg = e?.message || e?.error?.message || '';
    if (
      typeof msg === 'string' &&
      (msg.includes('ResizeObserver loop completed with undelivered notifications') ||
        msg.includes('ResizeObserver loop limit exceeded'))
    ) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return true;
    }
  },
  true
);

createRoot(document.getElementById('root')!).render(<App />);
