import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';
import styled, { useTheme } from 'styled-components';

import { record } from '@/types/walk';

interface ChartProps {
  records: record[];
}

interface ChartType {
  name: string;
  distance: number;
}

const initChartData: ChartType[] = Array.from({ length: 7 })
  .map((_, index) => ({
    name: dayjs().subtract(index, 'day').format('YYYY-MM-DD'),
    distance: 0,
  }))
  .reverse();

export default function Chart({ records }: ChartProps) {
  const [chartData, setChartData] = useState<ChartType[]>(initChartData);

  useEffect(() => {
    if (!(records && records.length !== 0)) return;
    const formattedRecords = records.map(({ startDate, distance }) => ({
      name: startDate,
      distance: distance,
    }));

    if (formattedRecords.length < 7) {
      const lastDate = dayjs(formattedRecords[formattedRecords.length - 1].name);
      const additionalData = Array.from({ length: 7 - formattedRecords.length }).map((_, index) => ({
        name: lastDate.subtract(index + 1, 'day').format('YYYY-MM-DD'),
        distance: 0,
      }));

      setChartData([...formattedRecords, ...additionalData]);
    } else {
      setChartData(formattedRecords);
    }
  }, [records]);

  const chartColor = useTheme().themeValues.colorValues.special.modalBg;

  return (
    <StyledGraphContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="2 5" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}km`} />
          <Tooltip formatter={(value) => `${value}km`} />
          <Bar dataKey="distance" fill={chartColor} />
        </BarChart>
      </ResponsiveContainer>
    </StyledGraphContainer>
  );
}

const StyledGraphContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
