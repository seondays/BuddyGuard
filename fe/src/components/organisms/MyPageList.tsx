import { message } from 'antd';
import styled, { useTheme } from 'styled-components';

import { fillAvailable } from '@/styles/layoutStyles';

import MyPageItem from '../molecules/MyPageItem';

export default function MyPageList() {
  const { toggleDarkMode } = useTheme();

  const handleDarkMode = () => {
    if (localStorage.getItem('theme') === 'light') {
      message.success('🌘 다크 모드로 변경되었습니다.');
    }
    if (localStorage.getItem('theme') === 'dark') {
      message.success('💡 라이트 모드로 변경되었습니다.');
    }
    toggleDarkMode();
  };

  const handleLogout = () => {
    // 캐시 스토리지 삭제
    caches.keys().then(function (names) {
      for (const name of names) caches.delete(name);
    });

    // 로컬 스토리지 삭제
    localStorage.clear();

    // 쿠키 삭제
    document.cookie.split(';').forEach((cookie) => {
      const [name] = cookie.split('=');
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    window.location.href = '/join';
  };

  return (
    <StyledListWrapper>
      <MyPageItem title="내 버디" router={`/MyPage/MyBuddy`} />
      <MyPageItem title="버디 추가하기" router="/MyPage/AddBuddy" />
      <MyPageItem title="버디가드 추가하기" router="/add-group-member" />
      <MyPageItem title="테마 변경" onClick={handleDarkMode} />
      <MyPageItem title="로그아웃" onClick={handleLogout} />
    </StyledListWrapper>
  );
}
const StyledListWrapper = styled.div`
  overflow-y: auto;
  margin-bottom: 1.5rem;
`;
