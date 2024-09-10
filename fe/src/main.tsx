import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import ThemeProvider from './context/ThemeProvider.tsx';
import { GlobalStyles } from './styles/globalStyles.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>
);
