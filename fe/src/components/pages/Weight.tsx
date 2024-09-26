import React from 'react';
import PageTitleBar from '../molecule/PageTitleBar';
import BuddyInfoBar from '../organism/BuddyInfoBar';
import WeightList from '../organism/WeightList';

export default function Weight() {
  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="체중 관리" />
      <BuddyInfoBar />
      <div style={{ height: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <WeightList />
      </div>
    </div>
  );
}
