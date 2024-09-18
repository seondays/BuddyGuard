import React from 'react';
import BuddyInfoBar from '../organism/BuddyInfoBar';
import PageTitleBar from '../molecule/PageTitleBar';

export default function Notification() {
  return (
    <div style={{ padding: '1rem' }}>
      <PageTitleBar />
      <BuddyInfoBar />
    </div>
  );
}
