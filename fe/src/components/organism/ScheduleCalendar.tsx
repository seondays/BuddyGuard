import React, { useState } from 'react';
import styled from 'styled-components';
import Span from '../atoms/Span';
import CommonCalendar from '../molecule/CommonCalendar';

// 카테고리별 색상 맵
const categoryColors: { [key: string]: string } = {
  건강: '#ff9999',
  산책: '#99ccff',
  식사: '#ffcc99',
  체중: '#A6C8DD',
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
export default function ScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredSchedules = schedulesData.filter((schedule) => selectedDate === schedule.date);

  return (
    <div style={{ padding: '1rem' }}>
      <CommonCalendar schedules={schedulesData} onDateChange={setSelectedDate} />
      <ScheduleList schedules={filteredSchedules} />
    </div>
  );
}

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
