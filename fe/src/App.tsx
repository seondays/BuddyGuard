import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

// import useFirebaseMessaging from './hooks/useFirebaseMessaging';
import { router } from './routes/router';
import { ResetStyles } from './styles/resetStyles';

const queryClient = new QueryClient();
function App() {
  // useFirebaseMessaging();

  return (
    <>
      <ResetStyles />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.VITE_MODE === 'development' && <ReactQueryDevtools initialIsOpen={false} position="left" />}
      </QueryClientProvider>
    </>
  );
}

export default App;
