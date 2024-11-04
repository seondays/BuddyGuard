import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import ThemeProvider from './context/ThemeProvider.tsx';
import { GlobalStyles } from './styles/globalStyles';

// MEMO : 카카오맵 로직 떄문에 MSW 주석
// async function enableMocking() {
//   if (import.meta.env.MODE !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser.ts');
//   return worker.start({
//     onUnhandledRequest: 'bypass',
//     serviceWorker: {
//       url: '/mockServiceWorker.js',
//     },
//   });
// }

// enableMocking().then(() => {
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>
);
// });
