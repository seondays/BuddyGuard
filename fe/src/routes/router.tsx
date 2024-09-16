import { createBrowserRouter } from 'react-router-dom';

import Home from '@/components/pages/Home';
import Menu from '@/components/pages/Menu';
import MyPage from '@/components/pages/MyPage';
import Notification from '@/components/pages/Notification';
import Walk from '@/components/pages/Walk';
import GoWalk from '@/components/pages/walk/GoWalk';
import ResponsiveLayout from '@/components/templates/ResponsiveLayout';

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
  {
    path: '/menu/walk/go',
    element: (
      <ResponsiveLayout>
        <GoWalk />
      </ResponsiveLayout>
    ),
  },
  // { path: '*', element: <Root /> },
  // { path: '/login', element: <Login /> },
  // { path: '/menu/schedule', element: <Schedule /> },
  // { path: '/menu/health', element: <Health /> },
  // { path: '/menu/food', element: <Food /> },
]);
