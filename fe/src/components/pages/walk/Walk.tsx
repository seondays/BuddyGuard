import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import Chart from '@/components/molecules/Chart';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import PeriodFilter from '@/components/molecules/PeriodFilter';
import Statistics from '@/components/molecules/Statistics';
import BuddyInfoBar from '@/components/organisms/BuddyInfoBar';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
import WalkCalendar from '@/components/organisms/walk/WalkCalendar';
import WalkList from '@/components/organisms/walk/WalkList';
import { useWalkQuery, UseWalkQueryProps } from '@/hooks/useWalkAPI';
import { useFilterStore } from '@/stores/useFilterStore';
import { flexColumn } from '@/styles/layoutStyles';
import { FilterType } from '@/types/walk';

function isWeekly(type: FilterType): type is 'weekly' {
  return type === 'weekly';
}

function isMonthly(type: FilterType): type is 'monthly' {
  return type === 'monthly';
}

function isAll(type: FilterType): type is 'all' {
  return type === 'all';
}

export default function Walk() {
  const { type, month, setType, year } = useFilterStore();

  const queryProps: UseWalkQueryProps = React.useMemo(() => {
    if (isWeekly(type)) return { filterKey: type, buddyId: 2 };
    if (isMonthly(type)) return { filterKey: type, buddyId: 2, month };
    if (isAll(type)) return { filterKey: type, buddyId: 2, month, year };
    throw new Error('Invalid filter type');
  }, [type, month, year]);

  const { data, isLoading } = useWalkQuery(queryProps);

  useEffect(() => {
    setType('weekly');
  }, [setType]);

  if (isLoading) return <p>Loading...</p>;

  const isWeeklyOrMonthly = isWeekly(type) || isMonthly(type);

  return (
    <StyledWalkContainer>
      <StyledStaticWrapper $isSchedule={type === 'all'}>
        <StyledSection>
          <PageTitleBar title="산책 관리" />
        </StyledSection>
        <StyledSection>
          <BuddyInfoBar />
        </StyledSection>
        <StyledSection>
          <PeriodFilter />
        </StyledSection>

        {isWeeklyOrMonthly && (
          <>
            <StyledSection $height={10}>
              <Statistics stats={data?.stats} />
            </StyledSection>

            <StyledSection $height={55} $responsiveHeight={55}>
              <Chart records={data?.records} />
            </StyledSection>
          </>
        )}
      </StyledStaticWrapper>

      {isWeeklyOrMonthly && (
        <StyledSection $height={30} $responsiveHeight={40}>
          <WalkList records={data?.records} />
        </StyledSection>
      )}

      {type === 'all' && (
        <StyledAllTypeWrapper>
          <StyledCalendarSection>
            <WalkCalendar records={data?.records} />
          </StyledCalendarSection>
          <StyledWalkListSection>
            <WalkList records={data?.records} />
          </StyledWalkListSection>
        </StyledAllTypeWrapper>
      )}
    </StyledWalkContainer>
  );
}

// 공통된 섹션 스타일을 함수로 추출
const StyledSection = styled.div<{ $height?: number; $responsiveHeight?: number }>`
  flex-shrink: 0;
  height: ${({ $height }) => $height}%;

  // 화면 너비가 60rem(960px) 이상일 때 조건 적용
  @media (min-width: 60rem) {
    height: ${({ $responsiveHeight, $height }) => $responsiveHeight || $height}%;
  }
`;

const StyledWalkListSection = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const StyledCalendarSection = styled.div`
  /* height: 70%; */
  max-height: 80%;
  @media (min-width: 60rem) {
    /* height: 65%; */
    max-height: 70%;
  }
`;

const StyledAllTypeWrapper = styled.div`
  flex-grow: 1;
  ${flexColumn}
  overflow: hidden;
`;

const StyledStaticWrapper = styled.div<{ $isSchedule: boolean }>`
  padding: 0.1rem 1rem;
  ${flexColumn}

  ${({ $isSchedule }) =>
    $isSchedule
      ? css`
          height: 25%;
          @media (min-width: 60rem) {
            height: 20%;
          }
        `
      : css`
          height: 70%;
          @media (min-width: 60rem) {
            height: 60%;
          }
        `}
`;

const StyledWalkContainer = styled.div`
  height: calc(100% - ${NAV_HEIGHT});
  background-color: ${({ theme }) => theme.currentTheme.backgroundPrimary};
  ${flexColumn}
`;
