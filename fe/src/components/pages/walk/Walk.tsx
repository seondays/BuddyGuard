import { useState } from 'react';
import styled from 'styled-components';

import Chart from '@/components/molecules/Chart';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import PeriodFilter from '@/components/molecules/PeriodFilter';
import Statistics from '@/components/molecules/Statistics';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import WalkList from '@/components/organisms/WalkList';
import { useWalkMutation } from '@/hooks/mutaionHooks';
import { clickedFilterType } from '@/types/walk';

export default function Walk() {
  const [clickedFilter, setClickedFilter] = useState<clickedFilterType>({ weekly: true, monthly: false, all: false });

  const handleSuccess = () => {
    console.log('Walk records fetched successfully!');
  };

  const { fetchWalkRecord } = useWalkMutation({ successFn: handleSuccess });

  return (
    <StyledWalkContainer>
      <div style={{ padding: `1rem` }}>
        <PageTitleBar title="산책 관리" />
        <BuddyInfoBar />
        <PeriodFilter
          clickedFilter={clickedFilter}
          setClickedFilter={setClickedFilter}
          fetchWalkRecord={fetchWalkRecord}
        />
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
