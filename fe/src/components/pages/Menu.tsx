import React from 'react';
import MenuList from '../organism/MenuList';
import BuddyInfoBar from '../organism/BuddyInfoBar';

export default function Menu() {
  return (
    <div style={{ padding: '1rem' }}>
      <BuddyInfoBar />
      <div style={{ height: '75vh' }}>
        <MenuList />
      </div>
    </div>
  );
}
