import React from 'react';
import BuddyInfoBar from '../organism/BuddyInfoBar';
import PageTitleBar from '../molecule/PageTitleBar';
import NotificationList from '../organism/NotificationList';

export default function Notification() {
  return (
    <div style={{ padding: '1rem', height: '100vh', overflow: 'hidden' }}>
      <PageTitleBar />
      <BuddyInfoBar />
      <div style={{ height: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <NotificationList />
      </div>
    </div>
  );
}
