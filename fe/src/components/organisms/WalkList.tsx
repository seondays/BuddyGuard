import styled from 'styled-components';

import ListBox from '../molecules/walk/ListBox';

export default function WalkList() {
  return (
    <StyledWalkListContainer>
      <StyledTitle>산책 리스트</StyledTitle>

      <ListBox />
      <ListBox />
    </StyledWalkListContainer>
  );
}

const StyledTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  margin-bottom: 1rem;
`;
const StyledWalkListContainer = styled.div`
  background-color: ${({ theme }) => theme.currentTheme.grayLighter};
  width: 100%;
  height: 100%;
  padding: 1rem;
`;
