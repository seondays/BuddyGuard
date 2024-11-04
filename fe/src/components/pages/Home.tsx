import React, { useEffect } from 'react';

import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import DashBoardList from '@/components/organisms/DashBoardList';
import { useAuthMutation } from '@/hooks/useAuthQuery';
import { useLoadUserInfo, useLoadPetsInfo } from '@/hooks/useLoad';

export default function Home() {
  const { getAccessToken, status } = useAuthMutation();

  useLoadUserInfo();
  useLoadPetsInfo();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) getAccessToken();
  }, [getAccessToken]);

  if (status === 'pending') return <div>로그인 중입니다...</div>;

  if (status === 'error') return null;

  return (
    <div style={{ padding: '1rem' }}>
      <BuddyInfoBar />
      <div style={{ height: '75vh', overflowY: 'scroll', scrollbarWidth: 'none', padding: '0 0.5rem' }}>
        <DashBoardList />
      </div>
    </div>
  );
}
