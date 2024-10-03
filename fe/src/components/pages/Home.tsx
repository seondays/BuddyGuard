import React, { useState } from 'react';
import BuddyInfoBar from '../organism/BuddyInfoBar';
import DashBoardList from '../organism/DashBoardList';
import FormModal from '../organism/FormModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: '1rem' }}>
      <BuddyInfoBar />
      <div style={{ height: '75vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <DashBoardList />
        <div>
          <button onClick={() => setIsModalOpen(true)}>Open Form Modal</button>

          {isModalOpen && <FormModal onClose={() => setIsModalOpen(false)} />}
        </div>
      </div>
    </div>
  );
}
