import PageTitleBar from '@/components/molecules/PageTitleBar';
import MyPageList from '@/components/organisms/MyPageList';
import UserInfoBar from '@/components/organisms/UserInfoBar';

export default function MyPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <PageTitleBar title="내 정보" />
      <UserInfoBar />
      <MyPageList />
    </div>
  );
}
