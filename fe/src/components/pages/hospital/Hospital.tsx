import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import HospitalList from '@/components/organisms/HospitalList';
import VaccinationList from '@/components/organisms/VaccinationList';

export default function Hospital() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'hospital' | 'vaccination'>('hospital');

  const handleAddRecord = () => {
    if (activeTab === 'hospital') {
      navigate('/menu/hospital/addhospital');
    } else if (activeTab === 'vaccination') {
      navigate('/menu/hospital/addvaccination');
    }
  };

  const handleTabClick = (tab: 'hospital' | 'vaccination') => {
    setActiveTab(tab);
  };

  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="건강 관리" />
      <BuddyInfoBar />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Button
          onClick={() => handleTabClick('hospital')}
          style={{
            backgroundColor: activeTab === 'hospital' ? '#FF7D29' : '#E0E0E0',
            color: activeTab === 'hospital' ? 'white' : '#333',
            padding: '0.8rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            marginRight: '0.5rem',
            cursor: 'pointer',
          }}
        >
          병원 기록
        </Button>
        <Button
          onClick={() => handleTabClick('vaccination')}
          style={{
            backgroundColor: activeTab === 'vaccination' ? '#FF7D29' : '#E0E0E0',
            color: activeTab === 'vaccination' ? 'white' : '#333',
            padding: '0.8rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          백신 기록
        </Button>
      </div>

      <div style={{ padding: '1rem', height: '58vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        {activeTab === 'hospital' && <HospitalList />}
        {activeTab === 'vaccination' && <VaccinationList />}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleAddRecord}
          style={{
            backgroundColor: '#FF7D29',
            color: 'white',
            padding: '1rem 2rem',
            width: 'auto',
            borderRadius: '1rem',
            border: 'none',
          }}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
