import React from 'react';
import PageTitleBar from '../molecule/PageTitleBar';
import BuddyInfoBar from '../organism/BuddyInfoBar';
import HealthList from '../organism/HealthList';

export default function Health() {
  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="건강 관리" />
      <BuddyInfoBar />
      <div style={{ height: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <HealthList />
      </div>
    </div>
  );
}
