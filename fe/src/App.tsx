import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/router';
import { GlobalStyles } from './styles/globalStyles';
import { ResetStyles } from './styles/resetStyles';

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <ResetStyles />
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.VITE_APP_ENV === 'development' && <ReactQueryDevtools initialIsOpen={true} />}
      </QueryClientProvider>
    </>
  );
}

export default App;
