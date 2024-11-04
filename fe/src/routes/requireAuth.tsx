import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const accessToken = localStorage.getItem('accessToken');

  if (import.meta.env.VITE_MODE !== 'development' && !accessToken) {
    return <Navigate to="/join" />;
  }

  return <>{children}</>;
}
