import { createBrowserRouter } from 'react-router-dom';

import Food from '@/components/pages/Food';
import Health from '@/components/pages/Health';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/login/Login';
import Menu from '@/components/pages/Menu';
import MyPage from '@/components/pages/MyPage';
import Notification from '@/components/pages/Notification';
import Schedule from '@/components/pages/Schedule';
import Walk from '@/components/pages/Walk';
import GoWalk from '@/components/pages/walk/GoWalk';
import Weight from '@/components/pages/Weight';
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
    path: '/login',
    element: (
      <ResponsiveLayout>
        <Login />
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
  {
    path: '/menu/schedule',
    element: (
      <ResponsiveLayout>
        {' '}
        <Schedule />{' '}
      </ResponsiveLayout>
    ),
  },
  {
    path: '/menu/health',
    element: (
      <ResponsiveLayout>
        {' '}
        <Health />{' '}
      </ResponsiveLayout>
    ),
  },
  {
    path: '/menu/walk',
    element: (
      <ResponsiveLayout>
        {' '}
        <Walk />{' '}
      </ResponsiveLayout>
    ),
  },

  {
    path: '/menu/food',
    element: (
      <ResponsiveLayout>
        {' '}
        <Food />{' '}
      </ResponsiveLayout>
    ),
  },
  {
    path: '/menu/weight',
    element: (
      <ResponsiveLayout>
        {' '}
        <Weight />{' '}
      </ResponsiveLayout>
    ),
  },
]);
