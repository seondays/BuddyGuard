import styled from 'styled-components';

import KakaoLogo from '@/svg/kakao_logo.svg';

import BuddyInfoBar from '../organisms/BuddyInfoBar';
import MenuList from '../organisms/MenuList';

export default function Menu() {
  const KAKAO_LOGO_COLOR = '#391d1d';

  return (
    <div style={{ padding: '1rem' }}>
      <BuddyInfoBar />
      <StyledKakaoLogo $color={KAKAO_LOGO_COLOR} />

      <div style={{ height: '75vh' }}>
        <MenuList />
      </div>
    </div>
  );
}

const StyledKakaoLogo = styled(KakaoLogo)<{ $color?: string }>`
  width: 2rem;
  height: 2rem;

  & path {
    fill: ${(props) => props.$color || ''};
  }
`;
