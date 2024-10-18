import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

import { useWalkQuery } from '@/hooks/useWalkQuery';
import { useFilterStore } from '@/stores/useFilterStore';
import Stamp from '@/svg/walk_stamp.svg';
import { FilterType, record } from '@/types/walk';

interface WalkCalendarProps {
  records: record[];
}

const getDate = () => dayjs().format('YY-MM-DD');

export default function WalkCalendar({ records }: WalkCalendarProps) {
  const { type, setMonth, setYear, setWeekly, setMonthly, setAll } = useFilterStore();
  const [queryParams, setQueryParams] = useState({
    filterKey: 'all' as FilterType,
    buddyId: 2,
    month: dayjs().month() + 1,
    year: dayjs().year(),
  });

  const { data, isLoading, refetch } = useWalkQuery(queryParams);

  useEffect(() => {
    refetch();
  }, [queryParams, refetch]);

  const [date, setDate] = useState<string | null>(getDate());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate: Date) => {
    console.log('😀handleDateChange');
  };

  const handleMonthChange = ({ activeStartDate }: { activeStartDate: Date }) => {
    console.log('🐶handleMonthChange');
    const year = Number(dayjs(activeStartDate).format('YYYY'));
    const month = Number(dayjs(activeStartDate).format('MM'));
    console.log(year, month);
    setYear(year);
    setMonth(month);
    setQueryParams((prev) => ({
      ...prev,
      month,
      year,
    }));
  };

  // 캘린더에 일정이 있으면 점 표시
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const schedule = records?.find(({ startDate }) => startDate === formattedDate);
    return schedule && view === 'month' ? <StyledStamp /> : null;
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        // onChange={handleDateChange}
        value={selectedDate}
        onChange={handleDateChange}
        onActiveStartDateChange={handleMonthChange} // 달이 바뀔 때 호출
        tileContent={tileContent}
        // formatDay={(date) => moment(date).format('D')}
        // formatYear={(date) => moment(date).format('YYYY')}
        // formatMonthYear={(date) => moment(date).format('YYYY. MM')}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        locale="ko"
      />
    </StyledCalendarWrapper>
  );
}

// 스타일
const StyledCalendarWrapper = styled.div`
  padding: 01rem;
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
  /* position: absolute; */
  /* top: 0.1rem; */
  /* bottom: 0; */
  width: 2rem;
  height: 2rem;
  opacity: 70%;
  /* transform: translateX(-50%); */
  /* left: 0; */
  /* margin: 0 auto; */
`;
