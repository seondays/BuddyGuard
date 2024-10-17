import styled from 'styled-components';

import { flexRowCenter } from '@/styles/layoutStyles';

interface StatisticsProps {
  stats?: { count: number; averageDistance: number; averageTime: string };
}

export default function Statistics({ stats }: StatisticsProps) {
  return (
    <StatisticsWrapper>
      <Item>
        <Label>산책</Label>
        <Value>{stats?.count || 0}</Value>
        <SubValue>회</SubValue>
      </Item>
      <Item>
        <Label>평균 거리</Label>
        <Value>{stats?.averageDistance.toFixed(3) || 0}</Value>
        <SubValue>km</SubValue>
      </Item>
      <Item>
        <Label>평균 시간</Label>
        <Value>{stats?.averageTime || '00:00:00'}</Value>
      </Item>
    </StatisticsWrapper>
  );
}

const StatisticsWrapper = styled.div`
  ${flexRowCenter}
  justify-content: space-around;
  margin: 0.5rem 0;
`;
const Item = styled.div`
  ${flexRowCenter}
  align-items: flex-end;
`;
const Label = styled.span`
  max-width: 4.5rem;
  color: ${({ theme }) => theme.currentTheme.textSecondary};
  font-size: 0.7rem;
  margin-right: 0.5rem;
`;
const Value = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  font-size: 1.2rem;
`;
const SubValue = styled.span`
  margin-left: 0.2rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.currentTheme.textSecondary};
`;
