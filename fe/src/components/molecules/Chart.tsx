import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import styled, { useTheme } from 'styled-components';

import { useFilterStore } from '@/stores/useFilterStore';
import { record } from '@/types/walk';

interface ChartProps {
  records: record[];
}

interface ChartType {
  name: string;
  distance: number;
}

const getCurrentMonthRange = (): ChartType[] => {
  const startOfMonth = dayjs().startOf('month'); // 월의 시작
  const endOfMonth = dayjs().endOf('month'); // 월의 끝
  const daysInMonth = endOfMonth.date(); // 월에 있는 총 일 수
  return Array.from({ length: daysInMonth }).map((_, index) => ({
    name: startOfMonth.add(index, 'day').format('YY-MM-DD'),
    distance: 0,
  }));
};

const getCurrentWeekRange = (): ChartType[] => {
  const startOfWeek = dayjs().startOf('week'); // 일요일 시작
  return Array.from({ length: 7 }).map((_, index) => ({
    name: startOfWeek.add(index, 'day').format('YY-MM-DD'),
    distance: 0,
  }));
};

export default function Chart({ records }: ChartProps) {
  const { type } = useFilterStore();

  const [chartData, setChartData] = useState<ChartType[]>(
    type === 'monthly' ? getCurrentMonthRange() : getCurrentWeekRange()
  );

  useEffect(() => {
    const dataRange = type === 'monthly' ? getCurrentMonthRange() : getCurrentWeekRange();

    const updatedData = dataRange.map(({ name }) => {
      const recordForDay = records?.find((record) => dayjs(record.startDate).format('YY-MM-DD') === name);
      return {
        name: name,
        distance: recordForDay ? recordForDay.distance : 0,
      };
    });

    setChartData(updatedData);
  }, [records, type]);

  const { widgetBlue: chartColor, textPrimary: axisFontColor } = useTheme().currentTheme;

  return (
    <StyledGraphContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 15, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="2 5" />
          <XAxis dataKey="name" tick={{ fill: axisFontColor, fontSize: 10 }} angle={-30} dy={10} />
          <YAxis tickFormatter={(value) => `${value}km`} tick={{ fill: axisFontColor }} />
          <Tooltip formatter={(value) => `${value}km`} />
          <Bar dataKey="distance" fill={chartColor} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </StyledGraphContainer>
  );
}

const StyledGraphContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 1rem;
  margin: 0 auto;
`;
