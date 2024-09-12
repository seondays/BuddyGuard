import { RouterProvider } from 'react-router-dom';

import { router } from './routes/router';
import { GlobalStyles } from './styles/globalStyles';
import { ResetStyles } from './styles/resetStyles';

function App() {
  return (
    <>
      <ResetStyles />
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
