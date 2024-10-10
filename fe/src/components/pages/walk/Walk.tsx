import PageTitleBar from '@/components/molecules/PageTitleBar';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';

export default function Walk() {
  return (
    <div style={{ padding: '1rem', height: '100vh' }}>
      <PageTitleBar title="산책 관리" />
      <BuddyInfoBar />
      <div style={{ height: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}></div>
    </div>
  );
}
