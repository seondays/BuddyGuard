import { createBrowserRouter } from 'react-router-dom';
import Home from '@/components/pages/Home';
import Menu from '@/components/pages/Menu';
import MyPage from '@/components/pages/MyPage';
import Walk from '@/components/pages/Walk';
import ResponsiveLayout from '@/components/templates/ResponsiveLayout';
import Notification from '@/components/pages/Notification';
import Login from '@/components/pages/Login';
import Health from '@/components/pages/Health';
import Schedule from '@/components/pages/Schedule';
import Food from '@/components/pages/Food';
import Weight from '@/components/pages/Weight';

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
  // {
  //   path: '/menu/walk/go',
  //   element: <GoWalk />,
  // },
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
