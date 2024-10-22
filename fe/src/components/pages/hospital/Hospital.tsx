import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import HospitalList from '@/components/organisms/HospitalList';
import VaccinationList from '@/components/organisms/VaccinationList';

export default function Hospital() {
  const navigate = useNavigate();

  const handleAddHospital = () => {
    navigate('/menu/hospital/addhospital');
  };

  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="건강 관리" />
      <BuddyInfoBar />
      <div style={{ padding: '1rem', height: '64vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <HospitalList />
        <VaccinationList />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleAddHospital}
          style={{
            backgroundColor: '#FF7D29',
            color: 'white',
            padding: '1rem 2rem',
            width: 'auto',
            borderRadius: '1rem',
            border: 'none',
            margin: '1rem',
          }}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
