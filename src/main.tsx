import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Prevent Flash of Unstyled Text (FOUT) by waiting for fonts to load
document.fonts.ready.then(() => {
  document.getElementById('root')?.classList.add('fonts-loaded');
});
