import { useState } from 'react';

import PageTitleBar from '@/components/molecules/PageTitleBar';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import FormModal from '@/components/organisms/FormModal';
import WeightList from '@/components/organisms/WeightList';
import { createWeightRecord } from '@/utils/weightApi';

export default function Weight() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreateWeight = async (newWeightData: any) => {
    console.log(newWeightData);
    try {
      await createWeightRecord(newWeightData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating weight:', error);
    }
  };
  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="체중 관리" />
      <BuddyInfoBar />
      <div>
        <button onClick={() => setIsModalOpen(true)}>+</button>
        {isModalOpen && (
          <FormModal
            onSubmit={handleCreateWeight}
            onClose={() => setIsModalOpen(false)}
            formTitle="체중"
            categoryTitle="체중"
          />
        )}
      </div>
      <div style={{ height: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <WeightList />
      </div>
    </div>
  );
}
