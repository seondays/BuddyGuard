// 올바른 데이터 구조
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
  {
    id: 7,
    date: '2024-09-01',
    category: '건강',
    title: '수잔이 병원 방문',
    time: '15:00',
    description: '정기 건강검진',
  },
  { id: 8, date: '2024-09-05', category: '산책', title: '예방 접종', time: '10:00', description: '독감 예방 접종' },
  { id: 9, date: '2024-09-10', category: '식사', title: '산책', time: '17:00', description: '반려견과 산책' },
];

// CustomCalendar 컴포넌트
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

export default function CustomCalendar() {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 날짜에 해당하는 일정 필터링
  const filteredSchedules = schedulesData.filter((schedule) => {
    return selectedDate && schedule.date === selectedDate;
  });

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    const formattedDate = moment(newDate).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
  };

  // 캘린더에 동그라미 점 표시
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const hasSchedules = schedulesData.some((schedule) => schedule.date === formattedDate);

    if (hasSchedules && view === 'month') {
      const category = schedulesData.find((schedule) => schedule.date === formattedDate)?.category;
      return <Dot color={categoryColors[category!]} />;
    }
    return null;
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

      {/* 선택한 날짜에 대한 일정 리스트 표시 */}
      <ScheduleList schedules={filteredSchedules} />
    </div>
  );
}

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

  // 전체 폰트 컬러
  .react-calendar__month-view {
    abbr {
      color: black;
    }
  }

  // 요일 밑줄 제거
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  // 일요일에만 빨간 폰트
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title='일요일'] {
    color: red;
  }

  .react-calendar__tile--now {
    background-color: gray;
    opacity: 50%;
    border-radius: 0.3rem;
    position: relative;

    abbr {
      color: white;
    }

    &::after {
      content: '오늘';
      position: absolute;
      bottom: 0rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.6rem;
      color: white;
      white-space: nowrap;
    }
  }

  // 선택한 날짜에 빨간색 배경
  .react-calendar__tile--active {
    background-color: red;
    border-radius: 0.2rem;
    abbr {
      color: white;
    }
  }

  // 네비게이션 가운데 정렬
  .react-calendar__navigation {
    justify-content: center;
  }

  // 네비게이션 버튼 컬러
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  // 네비게이션 비활성화 됐을때 스타일
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: ${(props) => props.theme.darkBlack};
  }

  // 년/월 상단 네비게이션 칸 크기 줄이기
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  // 선택한 날짜 스타일 적용
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: gray;
    border-radius: 0.2rem;
  }

  // 일 날짜 간격
  .react-calendar__tile {
    padding: 5px 0px 18px;
    position: relative;
  }

  // 네비게이션 월 스타일 적용
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.gray_1};
  }
`;

const StyledCalendar = styled(Calendar)``;

// 일정 리스트 컴포넌트
function ScheduleList({
  schedules,
  onDelete, // 삭제 핸들러
}: {
  schedules: { id: number; category: string; title: string; time: string; description: string }[];
  onDelete: (id: number) => void; // 삭제 핸들러 함수 추가
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
            <DeleteButton onClick={() => onDelete(schedule.id)}>삭제</DeleteButton>
          </ScheduleCard>
        ))
      ) : (
        <NoSchedule>선택한 날짜에 일정이 없습니다.</NoSchedule>
      )}
    </div>
  );
}

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
// 카테고리별 색상을 동그라미로 표시
const Dot = styled.div<{ color: string }>`
  width: 5px;
  height: 5px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin: 2px auto;
`;
