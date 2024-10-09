import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import DashBoardList from '@/components/organisms/DashBoardList';

export default function Home() {
  return (
    <div style={{ padding: '1rem' }}>
      <BuddyInfoBar />
      <div style={{ height: '75vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <DashBoardList />
        {/* <button onclick=""></button> */}
        {/* <a href="api/buddyguard.site/login"></a> */}
      </div>
    </div>
  );
}
