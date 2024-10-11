import { useEffect } from 'react';

import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import DashBoardList from '@/components/organisms/DashBoardList';
import { useAuthMutation } from '@/hooks/useAuthQuery';

export default function Home() {
  const { getAccessToken, isPending, status } = useAuthMutation();

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);
  if (isPending) return <div>로그인 중입니다...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <BuddyInfoBar />
      <div style={{ height: '75vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <DashBoardList />
      </div>
    </div>
  );
}
