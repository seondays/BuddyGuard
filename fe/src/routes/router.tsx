// import GoWalk from '@/components/pages/walk/GoWalk';
import Home from '@/components/pages/Home';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  // {
  //   path: '/menu/walk/go',
  //   element: <GoWalk />,
  // },
  // { path: '*', element: <Root /> },
  { path: '/', element: <Home /> },
  // { path: '/login', element: <Login /> },
  // { path: '/menu', element: <Menu /> },
  // { path: '/menu/schedule', element: <Schedule /> },
  // { path: '/menu/health', element: <Health /> },
  // { path: '/menu/food', element: <Food /> },
  // { path: '/menu/walk', element: <Walk /> },
]);
