import React from 'react';
import PageTitleBar from '../molecule/PageTitleBar';
import BuddyInfoBar from '../organism/BuddyInfoBar';
import FoodList from '../organism/FoodList';

export default function Food() {
  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="식사 관리" />
      <BuddyInfoBar />
      <div style={{ height: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <FoodList />
      </div>
    </div>
  );
}
