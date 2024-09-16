import { createBrowserRouter } from 'react-router-dom';
import Home from '@/components/pages/Home';
import Menu from '@/components/pages/Menu';
import MyPage from '@/components/pages/MyPage';
import Walk from '@/components/pages/Walk';
import ResponsiveLayout from '@/components/templates/ResponsiveLayout';
import Notification from '@/components/pages/notification';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ResponsiveLayout>
        <Home />
      </ResponsiveLayout>
    ),
  },
  {
    path: '/menu/walk',
    element: (
      <ResponsiveLayout>
        <Walk />
      </ResponsiveLayout>
    ),
  },
  {
    path: '/menu',
    element: (
      <ResponsiveLayout>
        <Menu />
      </ResponsiveLayout>
    ),
  },
  {
    path: '/notification',
    element: (
      <ResponsiveLayout>
        <Notification />
      </ResponsiveLayout>
    ),
  },
  {
    path: '/MyPage',
    element: (
      <ResponsiveLayout>
        <MyPage />
      </ResponsiveLayout>
    ),
  },
  // {
  //   path: '/menu/walk/go',
  //   element: <GoWalk />,
  // },
  // { path: '*', element: <Root /> },
  // { path: '/login', element: <Login /> },
  // { path: '/menu/schedule', element: <Schedule /> },
  // { path: '/menu/health', element: <Health /> },
  // { path: '/menu/food', element: <Food /> },
]);
