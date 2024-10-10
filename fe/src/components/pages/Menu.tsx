import styled from 'styled-components';

import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import MenuList from '@/components/organisms/MenuList';
import { NAV_HEIGHT } from '@/components/organisms/Nav';

export default function Menu() {
  return (
    <StyledMenuContainer>
      <BuddyInfoBar />
      <StyledMenuListWrapper $navHeight={NAV_HEIGHT}>
        <MenuList />
      </StyledMenuListWrapper>
    </StyledMenuContainer>
  );
}

const StyledMenuContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const StyledMenuListWrapper = styled.div<{ $navHeight: string }>`
  margin-top: 1.5rem;
  height: ${({ $navHeight }) => `calc(85% - ${$navHeight})`};
`;
