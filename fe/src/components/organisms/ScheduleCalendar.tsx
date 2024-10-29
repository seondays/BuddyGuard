import { useState, useEffect } from 'react';
import styled from 'styled-components';

import CommonCalendar from '@/components/molecules/CommonCalendar';
import { useScheduleQuery } from '@/hooks/useScheduleQuery';

import Span from '../atoms/Span';

const categoryColors: { [key: string]: string } = {
  건강: '#ff9999',
  산책: '#99ccff',
  식사: '#ffcc99',
  체중: '#A6C8DD',
  병원: '#ffb3b3',
  백신: '#ffb366',
};

export default function ScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const date = new Date(selectedDate);
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  }, [selectedDate]);

  const petId = 56;
  const { data, isLoading, error } = useScheduleQuery(petId, year, month);
  console.log(data);
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  const schedulesData = [
    ...(data?.hospitalRecords || []).map((record: any) => ({
      id: record.id,
      date: record.date.split('T')[0],
      category: record.subCategory || record.mainCategory,
      title: record.title,
      time: new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: record.description,
      subCategory: record.subCategory || '병원',
    })),
    ...(data?.weightRecords || []).map((record: any) => ({
      id: record.id,
      date: record.recordedAt.split('T')[0],
      category: record.mainCategory,
      title: `체중 기록: ${record.weight}kg`,
      time: new Date(record.recordedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: record.description,
      subCategory: '체중',
    })),
  ];

  const filteredSchedules = schedulesData.filter((schedule) => schedule.date === selectedDate);

  return (
    <div style={{ padding: '1rem' }}>
      <CommonCalendar schedules={schedulesData} onDateChange={setSelectedDate} />
      <ScheduleList schedules={filteredSchedules} />
    </div>
  );
}

function ScheduleList({
  schedules,
}: {
  schedules: { id: number; category: string; time: string; description: string; subCategory: string }[];
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
              <Span $color="white">{schedule.subCategory}</Span>
              <Span $color="white" style={{ margin: '0 0.5rem' }}>
                |
              </Span>
              <Span $color="white">{schedule.description}</Span>
            </ScheduleContent>
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

const NoSchedule = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
  background-color: #f2f2f2;
  border-radius: 0.5rem;
`;
