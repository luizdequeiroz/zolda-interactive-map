import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerSW } from './utils/serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registra o Service Worker para PWA
registerSW(
  (registration) => {
    console.log('PWA: Service Worker registrado com sucesso');
  },
  (registration) => {
    console.log('PWA: Nova versão disponível');
  }
);

reportWebVitals();
