import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import moment from 'moment';
import Span from '../atoms/Span';

moment.locale('ko');

// 카테고리별 색상 맵
const categoryColors: { [key: string]: string } = {
  건강: '#ff9999',
  산책: '#99ccff',
  식사: '#ffcc99',
};

// 일정 데이터
const schedulesData = [
  {
    id: 1,
    date: '2024-09-01',
    category: '건강',
    title: '수잔이 병원 방문',
    time: '15:00',
    description: '정기 건강검진',
  },
  { id: 2, date: '2024-09-05', category: '산책', title: '예방 접종', time: '10:00', description: '독감 예방 접종' },
  { id: 3, date: '2024-09-10', category: '식사', title: '산책', time: '17:00', description: '반려견과 산책' },
  {
    id: 4,
    date: '2024-09-21',
    category: '건강',
    title: '수잔이 병원 방문',
    time: '15:00',
    description: '정기 건강검진',
  },
  { id: 5, date: '2024-09-15', category: '산책', title: '예방 접종', time: '10:00', description: '독감 예방 접종' },
  { id: 6, date: '2024-09-10', category: '식사', title: '산책', time: '17:00', description: '반려견과 산책' },
];

// 메인 컴포넌트
export default function CustomCalendar() {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredSchedules = schedulesData.filter((schedule) => selectedDate === schedule.date);

  const handleDateChange = (newDate: Date) => {
    const formattedDate = moment(newDate).format('YYYY-MM-DD');
    setDate(newDate);
    setSelectedDate(formattedDate);
  };

  // 캘린더에 일정이 있으면 점 표시
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const schedule = schedulesData.find((schedule) => schedule.date === formattedDate);
    return schedule && view === 'month' ? <Dot color={categoryColors[schedule.category]} /> : null;
  };

  return (
    <div style={{ padding: '1rem' }}>
      <StyledCalendarWrapper>
        <StyledCalendar
          value={date}
          onChange={handleDateChange}
          tileContent={tileContent}
          formatDay={(locale, date) => moment(date).format('D')}
          formatYear={(locale, date) => moment(date).format('YYYY')}
          formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          locale="ko"
        />
      </StyledCalendarWrapper>

      {/* 선택한 날짜의 일정 목록 */}
      <ScheduleList schedules={filteredSchedules} />
    </div>
  );
}

// 스타일
const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }

  .react-calendar__tile--now {
    background-color: gray;
    opacity: 50%;
    border-radius: 0.3rem;
    abbr {
      color: white;
    }
  }

  .react-calendar__tile--active {
    background-color: red;
    border-radius: 0.2rem;
    abbr {
      color: white;
    }
  }
`;

const StyledCalendar = styled(Calendar)``;

// 일정 리스트 컴포넌트
function ScheduleList({
  schedules,
}: {
  schedules: { id: number; category: string; time: string; description: string }[];
}) {
  return (
    <div>
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <ScheduleCard key={schedule.id} category={schedule.category}>
            <ScheduleContent>
              <Span $color="white">{schedule.time}</Span>
              <Span $color="white" style={{ margin: '0 0.5rem' }}>
                |
              </Span>
              <Span $color="white">{schedule.description}</Span>
            </ScheduleContent>
            <DeleteButton>삭제</DeleteButton>
          </ScheduleCard>
        ))
      ) : (
        <NoSchedule>선택한 날짜에 일정이 없습니다.</NoSchedule>
      )}
    </div>
  );
}

// 일정 카드 스타일
const ScheduleCard = styled.div<{ category: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ category }) => categoryColors[category] || '#f9f9f9'};
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ScheduleContent = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: red;
  font-size: 1rem;
  cursor: pointer;
`;

const NoSchedule = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
  background-color: #f2f2f2;
  border-radius: 0.5rem;
`;

// 일정에 점 표시 스타일
const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin: 0 auto;
`;
