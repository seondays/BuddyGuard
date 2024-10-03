import PageTitleBar from '../molecules/PageTitleBar';
import BuddyInfoBar from '../organisms/BuddyInfoBar';
import NotificationList from '../organisms/NotificationList';

export default function Notification() {
  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="알림" />
      <BuddyInfoBar />

      <div style={{ height: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}>
        <NotificationList />
      </div>
    </div>
  );
}
