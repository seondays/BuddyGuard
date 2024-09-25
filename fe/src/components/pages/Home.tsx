import React from 'react';
import BuddyInfoBar from '../organism/BuddyInfoBar';
import DashBoardList from '../organism/DashBoardList';

export default function Home() {
  return (
    <div style={{ padding: '1rem' }}>
      <BuddyInfoBar />
      <div style={{ height: '75vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <DashBoardList />
      </div>
    </div>
  );
}
