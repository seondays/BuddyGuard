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
  const [buddyId, setBuddyId] = useState(0);

  const filterKey =
    (Object.entries(clickedFilter).find(([, value]) => value)?.[0] as keyof clickedFilterType) || 'weekly';

  const { data, isLoading } = useWalkQuery(filterKey, 2);

  console.log(data?.stats);
  console.log(data?.records);

  if (isLoading) return <p>Loading...</p>;

  return (
    <StyledWalkContainer>
      <div style={{ padding: `1rem` }}>
        <PageTitleBar title="산책 관리" />
        <BuddyInfoBar />
        <PeriodFilter clickedFilter={clickedFilter} setClickedFilter={setClickedFilter} />
        <Statistics stats={data?.stats} />
        <Chart />
      </div>
      <WalkList records={data?.records} />
    </StyledWalkContainer>
  );
}

const StyledWalkContainer = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.currentTheme.backgroundPrimary};
`;
