import PageTitleBar from '@/components/molecules/PageTitleBar';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import ScheduleCalendar from '@/components/organisms/ScheduleCalendar';

export default function Schedule() {
  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="일정 관리" />
      <BuddyInfoBar />
      {/* <ScheduleCalendar /> */}
    </div>
  );
}
