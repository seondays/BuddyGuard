import PageTitleBar from '@/components/molecules/PageTitleBar';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import FoodList from '@/components/organisms/FoodList';

export default function Food() {
  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="식사 관리" />
      <BuddyInfoBar />
      <div style={{ height: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <FoodList />
      </div>
    </div>
  );
}
