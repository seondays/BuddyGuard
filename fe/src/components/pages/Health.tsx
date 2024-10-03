import { useState } from 'react';

import PageTitleBar from '@/components/molecules/PageTitleBar';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import FormModal from '@/components/organisms/FormModal';
import HealthList from '@/components/organisms/HealthList';

export default function Health() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="건강 관리" />
      <BuddyInfoBar />
      <div>
        <button onClick={() => setIsModalOpen(true)}>+</button>
        {isModalOpen && <FormModal onClose={() => setIsModalOpen(false)} formTitle="건강 등록" categoryTitle="건강" />}
      </div>
      <div style={{ height: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <HealthList />
      </div>
    </div>
  );
}
