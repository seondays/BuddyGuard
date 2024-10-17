import styled from 'styled-components';

import ListBox, { StyledListBoxWrapper } from '@/components/molecules/walk/ListBox';
import { flexColumn } from '@/styles/layoutStyles';
import Puppy from '@/svg/puppy.svg';
import { record } from '@/types/walk';

interface WalkListProps {
  records: record[];
}

export default function WalkList({ records }: WalkListProps) {
  return (
    <StyledWalkListContainer>
      <StyledTitle>산책 리스트</StyledTitle>

      <StyledListWrapper>
        {records.length > 0 ? (
          records.map((record, idx) => <ListBox record={record} key={`record-${idx}`} />)
        ) : (
          <NoRecordBoxWrapper>
            <StyledPuppy />
            <NoRecordText>산책 기록이 없네요 :(</NoRecordText>
          </NoRecordBoxWrapper>
        )}
      </StyledListWrapper>
    </StyledWalkListContainer>
  );
}

const NoRecordBoxWrapper = styled(StyledListBoxWrapper)`
  justify-content: center;
  cursor: auto;
`;
const NoRecordText = styled.div`
  color: ${({ theme }) => theme.themeValues.colorValues.grayscale[400]};
`;

const StyledPuppy = styled(Puppy)`
  width: 3rem;
  margin-right: 1rem;
  & path {
    fill: ${({ theme }) => theme.themeValues.colorValues.grayscale[400]};
  }
`;

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
