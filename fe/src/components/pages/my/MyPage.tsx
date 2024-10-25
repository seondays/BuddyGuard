import styled from 'styled-components';

import PageTitleBar from '@/components/molecules/PageTitleBar';
import MyPageList from '@/components/organisms/MyPageList';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
import UserInfoBar from '@/components/organisms/UserInfoBar';
import { useUserInfoQuery } from '@/hooks/useUserAPI';
import { fillAvailable, flexColumn } from '@/styles/layoutStyles';

export default function MyPage() {
  const { data: userInfo, isSuccess } = useUserInfoQuery();

  if (!isSuccess || !userInfo) {
    return <div>Loading...</div>;
  }

  const { userId, name, email, profileImages, petsId } = userInfo;

  return (
    <StyledMyPageContainer>
      <PageTitleBar title="내 정보" />
      <UserInfoBar name={name} email={email} profileImage={profileImages} />
      <MyPageList />
    </StyledMyPageContainer>
  );
}

const StyledMyPageContainer = styled.div`
  padding: 1rem;
  height: calc(100% - ${NAV_HEIGHT});
  ${flexColumn}
  ${fillAvailable}
`;
