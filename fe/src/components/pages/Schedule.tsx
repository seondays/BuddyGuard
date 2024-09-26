import React from 'react';
import PageTitleBar from '../molecule/PageTitleBar';
import BuddyInfoBar from '../organism/BuddyInfoBar';
import CustomCalendar from '../organism/CustomCalendar';

export default function Schedule() {
  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="일정 관리" />
      <BuddyInfoBar />
      <CustomCalendar />
    </div>
  );
}
