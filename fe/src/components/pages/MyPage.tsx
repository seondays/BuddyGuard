import React from 'react';
import UserInfoBar from '../organism/UserInfoBar';
import PageTitleBar from '../molecule/PageTitleBar';
import MyPageList from '../organism/MyPageList';

export default function MyPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <PageTitleBar title="내 정보" />
      <UserInfoBar />
      <MyPageList />
    </div>
  );
}
