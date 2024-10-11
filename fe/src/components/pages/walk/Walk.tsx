import { useState } from 'react';
import styled from 'styled-components';

import Chart from '@/components/molecules/Chart';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import PeriodFilter from '@/components/molecules/PeriodFilter';
import Statistics from '@/components/molecules/Statistics';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import WalkList from '@/components/organisms/WalkList';
import { useWalkQuery } from '@/hooks/useWalkAPI';
import { clickedFilterType } from '@/types/walk';

export default function Walk() {
  const [clickedFilter, setClickedFilter] = useState<clickedFilterType>({ weekly: true, monthly: false, all: false });

  const filterKey =
    (Object.entries(clickedFilter).find(([, value]) => value)?.[0] as keyof clickedFilterType) || 'weekly';

  const { data, isLoading } = useWalkQuery(filterKey);

  if (isLoading) return <p>Loading...</p>;

  console.log(data);

  return (
    <StyledWalkContainer>
      <div style={{ padding: `1rem` }}>
        <PageTitleBar title="산책 관리" />
        <BuddyInfoBar />
        <PeriodFilter clickedFilter={clickedFilter} setClickedFilter={setClickedFilter} />
        <Statistics />
        <Chart />
      </div>
      <WalkList />
    </StyledWalkContainer>
  );
}

const StyledWalkContainer = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.currentTheme.backgroundPrimary};
`;
