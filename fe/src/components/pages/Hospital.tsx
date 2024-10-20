import PageTitleBar from '@/components/molecules/PageTitleBar';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import HospitalList from '@/components/organisms/HospitalList';
import { theme } from '@/styles/theme';

import Button from '../atoms/Button';

export default function Hospital() {
  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="건강 관리" />
      <BuddyInfoBar />
      <div style={{ padding: '1rem', height: '60vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <HospitalList />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          style={{
            fontWeight: 'bold',
            width: '50%',
            border: `0.2rem solid ${theme.colorValues.special.textForce02}`,
            borderRadius: '10rem',
          }}
        >
          병원 기록 등록
        </Button>
      </div>
    </div>
  );
}
