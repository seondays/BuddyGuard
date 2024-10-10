import styled from 'styled-components';

import Chart from '@/components/molecules/Chart';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import PeriodFilter from '@/components/molecules/PeriodFilter';
import Statistics from '@/components/molecules/Statistics';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';

export default function Walk() {
  return (
    <StyledWalkContainer>
      <PageTitleBar title="산책 관리" />
      <BuddyInfoBar />
      <PeriodFilter />
      <Statistics />
      <Chart />

      <div style={{ height: '70vh', overflowY: 'scroll', scrollbarWidth: 'none' }}></div>
    </StyledWalkContainer>
  );
}

const StyledWalkContainer = styled.div`
  padding: 1rem;
  height: 100%;
  background-color: ${({ theme }) => theme.currentTheme.backgroundPrimary};
`;
