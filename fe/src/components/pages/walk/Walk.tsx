import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Chart from '@/components/molecules/Chart';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import PeriodFilter from '@/components/molecules/PeriodFilter';
import Statistics from '@/components/molecules/Statistics';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import WalkList from '@/components/organisms/WalkList';
import { clickedFilterType, WalkMockData } from '@/types/walk';

export default function Walk() {
  const [clickedFilter, setClickedFilter] = useState<clickedFilterType>({ week: true, month: false, all: false });
  // const [walks, setWalks] = useState<Walk[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchWalks = async () => {
  //     try {
  //       const filterKey = Object.entries(clickedFilter).filter(([, value]) => value)?.[0][0];
  //       console.log(filterKey);
  //       // setLoading(true);
  //       const response = await axios.get<WalkMockData>(`/api/walks/${filterKey}`);
  //       // setWalks(response.data.data);
  //       console.log(response.data.data);
  //       // setError(null);
  //     } catch (err) {
  //       // setError('Failed to fetch walks data');
  //       console.error('Error fetching walks:', err);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };

  //   fetchWalks();
  // }, [clickedFilter]);

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
