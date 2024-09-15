import { RouterProvider } from 'react-router-dom';

import ResponsiveLayout from './components/templates/ResponsiveLayout';
import { router } from './routes/router';
import { GlobalStyles } from './styles/globalStyles';
import { ResetStyles } from './styles/resetStyles';

function App() {
  return (
    <>
      <ResetStyles />
      <GlobalStyles />
      <ResponsiveLayout>
        <RouterProvider router={router} />
      </ResponsiveLayout>
    </>
  );
}

export default App;