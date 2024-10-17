import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Chart from '@/components/molecules/Chart';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import PeriodFilter from '@/components/molecules/PeriodFilter';
import Statistics from '@/components/molecules/Statistics';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
import ScheduleCalendar from '@/components/organisms/ScheduleCalendar';
import WalkList from '@/components/organisms/WalkList';
import { useWalkQuery } from '@/hooks/useWalkAPI';
import { useFilterStore } from '@/stores/useFilterStore';
import { flexColumn } from '@/styles/layoutStyles';

export default function Walk() {
  const [buddyId, setBuddyId] = useState(2);

  const { type, month, setType } = useFilterStore();

  const { data, isLoading } = useWalkQuery(type, buddyId, type !== 'weekly' ? month : undefined);

  useEffect(() => {
    setType('weekly');
  }, [setType]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <StyledWalkContainer>
      <StyledStaticWrapper>
        <StyledSection $height={10}>
          <PageTitleBar title="산책 관리" />
        </StyledSection>
        <StyledSection $height={15}>
          <BuddyInfoBar />
        </StyledSection>
        <StyledSection $height={10}>
          <PeriodFilter />
        </StyledSection>
        <StyledSection $height={10}>
          <Statistics stats={data?.stats} />
        </StyledSection>

        <StyledSection $height={55} $responsiveHeight={55}>
          {type !== 'all' ? <Chart records={data?.records} /> : <ScheduleCalendar />}
        </StyledSection>
      </StyledStaticWrapper>

      <StyledSection $height={30} $responsiveHeight={40}>
        {type !== 'all' && <WalkList records={data?.records} />}
      </StyledSection>
    </StyledWalkContainer>
  );
}

// 공통된 섹션 스타일을 함수로 추출
const StyledSection = styled.div<{ $height: number; $responsiveHeight?: number }>`
  flex-shrink: 0;
  height: ${({ $height }) => $height}%;

  // 화면 너비가 60rem(960px) 이상일 때 조건 적용
  ${({ $responsiveHeight }) =>
    $responsiveHeight &&
    `@media (min-width: 60rem) {
      height: ${$responsiveHeight}%;
    }`}
`;

const StyledStaticWrapper = styled.div`
  padding: 1rem;
  height: 70%;
  ${flexColumn}
  // 화면 너비가 60rem(960px) 이상일 때 조건 적용
  @media (min-width: 60rem) {
    height: 60%;
  }
`;

const StyledWalkContainer = styled.div`
  height: calc(100% - ${NAV_HEIGHT});
  background-color: ${({ theme }) => theme.currentTheme.backgroundPrimary};
  ${flexColumn}
`;
