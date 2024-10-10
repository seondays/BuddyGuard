import styled from 'styled-components';

import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import MenuList from '@/components/organisms/MenuList';

export default function Menu() {
  return (
    <StyledMenuContainer>
      <BuddyInfoBar />
      <StyledMenuListWrapper>
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

const StyledMenuListWrapper = styled.div`
  height: 80%;
`;
