import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import FeedList from '@/components/organisms/FeedList';

export default function Food() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="식사 관리" />
      <BuddyInfoBar />
      <div style={{ height: '65vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <FeedList />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => navigate('/menu/feed/addFeed')}
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
