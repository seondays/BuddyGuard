import styled from 'styled-components';

import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import MenuList from '@/components/organisms/MenuList';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
import { fillAvailable } from '@/styles/layoutStyles';

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
  height: calc(100% - ${NAV_HEIGHT});
  background-color: ${({ theme }) => theme.currentTheme.backgroundPrimary};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  ${fillAvailable};
`;

const StyledMenuListWrapper = styled.div<{ $navHeight: string }>`
  margin-top: 1.5rem;
  height: calc(100% - ${NAV_HEIGHT});
`;
