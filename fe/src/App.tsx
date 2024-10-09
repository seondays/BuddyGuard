import { RouterProvider } from 'react-router-dom';

import useFirebaseMessaging from './hooks/useFirebaseMessaging';
import { router } from './routes/router';
import { GlobalStyles } from './styles/globalStyles';
import { ResetStyles } from './styles/resetStyles';

function App() {
  useFirebaseMessaging();

  return (
    <>
      <ResetStyles />
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
