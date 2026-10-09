import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { testConnection } from './firebase.ts';

// Test connection to Firestore
testConnection().catch(() => {});

// Prevent benign unhandled errors (e.g. Firebase Analytics installation apiKey mismatch or ResizeObserver)
window.addEventListener('unhandledrejection', (event) => {
  const reason = event?.reason?.message || String(event?.reason || '');
  if (
    reason.includes('installations/request-failed') ||
    reason.includes('API key not valid') ||
    reason.includes('ResizeObserver')
  ) {
    event.preventDefault();
  }
});

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
