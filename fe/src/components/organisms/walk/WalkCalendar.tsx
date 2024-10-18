import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

import { useWalkQuery } from '@/hooks/useWalkQuery';
import { useFilterStore } from '@/stores/useFilterStore';
import Stamp from '@/svg/walk_stamp.svg';
import { FilterType } from '@/types/walk';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function WalkCalendar() {
  const { setAll, month, year } = useFilterStore();

  const [activeDate, setActiveDate] = useState(new Date(year, month - 1, 1));
  const [selectedDate, setSelectedDate] = useState(activeDate);

  const queryParams = useMemo(
    () => ({
      filterKey: 'all' as FilterType,
      buddyId: 2,
      month: activeDate.getMonth() + 1,
      year: activeDate.getFullYear(),
    }),
    [activeDate]
  );

  const { data, isLoading, refetch } = useWalkQuery(queryParams);

  const handleDateChange = (newDate: Value) => {
    if (!(newDate instanceof Date)) return;
    if (isLoading) return;

    setSelectedDate(newDate);
    setActiveDate(newDate);

    const selectedRecord = data.records.find(({ startDate }: { startDate: string }) =>
      dayjs(startDate).isSame(newDate, 'day')
    );
    if (selectedRecord) {
      // TODO:선택된 날짜의 산책 정보 부모로 올리기
      console.log('Selected record:', selectedRecord);
    }
  };

  const handleMonthChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (!activeStartDate) return;
    setActiveDate(activeStartDate);
  };

  // 캘린더에 일정이 있으면 점 표시
  const tileContent = useMemo(() => {
    return ({ date, view }: { date: Date; view: string }) => {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      const schedule = data?.records?.find(({ startDate }: { startDate: string }) => startDate === formattedDate);
      return schedule && view === 'month' ? <StyledStamp /> : null;
    };
  }, [data?.records]);

  useEffect(() => {
    const newMonth = activeDate.getMonth() + 1;
    const newYear = activeDate.getFullYear();
    setAll(newMonth, newYear);
    refetch();
  }, [activeDate]);

  return (
    <StyledCalendarWrapper>
      {isLoading ? (
        <div>🥚 🐣 🐤 🐥 Loading...</div> // 또는 <LoadingSpinner /> 등의 로딩 컴포넌트
      ) : (
        <StyledCalendar
          value={selectedDate}
          onChange={handleDateChange}
          onActiveStartDateChange={handleMonthChange}
          tileContent={tileContent}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          locale="ko"
        />
      )}
    </StyledCalendarWrapper>
  );
}

// 스타일
const StyledCalendarWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  & .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: ${({ theme }) => `0 0 0.81rem 0.125rem ${theme.currentTheme.shadow}`};
    padding: 1% 1.5%;
    background-color: transparent;
  }

  & abbr {
    color: ${({ theme }) => theme.currentTheme.textPrimary};
  }

  & .react-calendar__navigation * {
    background-color: ${({ theme }) => theme.currentTheme.widgetBlue};
    color: ${({ theme }) => theme.currentTheme.textSecondary};
  }
  & .react-calendar__navigation__prev-button {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  & .react-calendar__navigation__next-button {
    border-radius: 0 0.5rem 0.5rem 0;
  }

  & .react-calendar__viewContainer {
    padding: 0 2% 2% 2%;
  }
  & .react-calendar__tile {
    height: 3rem;
    position: relative;
    display: flex;
    justify-content: center;

    abbr {
      position: absolute;
      top: 1.1rem;
      z-index: 999;
    }
  }

  & .react-calendar__tile--now {
    background-color: gray;
    opacity: 50%;
    border-radius: 0.3rem;
    abbr {
      color: white;
    }
  }

  & .react-calendar__tile--active {
    border-radius: 0.2rem;
    abbr {
      color: white;
    }
  }
`;

const StyledCalendar = styled(Calendar)``;

const StyledStamp = styled(Stamp)`
  width: 2rem;
  height: 2rem;
  opacity: 70%;
`;
