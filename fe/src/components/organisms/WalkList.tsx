import styled from 'styled-components';

import ListBox from '@/components/molecules/walk/ListBox';
import { flexColumn } from '@/styles/layoutStyles';

export default function WalkList() {
  return (
    <StyledWalkListContainer>
      <StyledTitle>산책 리스트</StyledTitle>

      <StyledListWrapper>
        <ListBox />
        <ListBox />
        <ListBox />
        <ListBox />
        <ListBox />
        <ListBox />
        <ListBox />
      </StyledListWrapper>
    </StyledWalkListContainer>
  );
}

const StyledListWrapper = styled.div`
  overflow-y: auto;
  padding: 0 0.3rem;
  /* 남은 공간을 모두 차지 */
  flex-grow: 1;
`;

const StyledTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  margin-bottom: 0.5rem;
  height: 10%;
  /* 크기가 줄어들지 않도록 설정 */
  flex-shrink: 0;
`;
const StyledWalkListContainer = styled.div`
  background-color: ${({ theme }) => theme.currentTheme.grayLighter};
  width: 100%;
  height: 100%;
  padding: 1rem 1rem 0.5rem 1rem;
  ${flexColumn}
`;
