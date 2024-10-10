import styled from 'styled-components';

import { flexRow } from '@/styles/layoutStyles';

export default function Statistics() {
  return (
    <StatisticsWrapper>
      <Item>
        <Label>산책</Label>
        <Value>10</Value>
        <SubValue>회</SubValue>
      </Item>
      <Item>
        <Label>평균 거리</Label>
        <Value>2.8</Value>
        <SubValue>km</SubValue>
      </Item>
      <Item>
        <Label>평균 시간</Label>
        <Value>10:10:02</Value>
      </Item>
    </StatisticsWrapper>
  );
}

const StatisticsWrapper = styled.div`
  ${flexRow}
  justify-content: space-between;
  margin: 1.5rem 0;
`;
const Item = styled.div`
  ${flexRow}
  align-items: flex-end;
`;
const Label = styled.span`
  max-width: 4.5rem;
  color: ${({ theme }) => theme.currentTheme.textSecondary};
  margin-right: 0.5rem;
`;
const Value = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  font-size: 1.5rem;
`;
const SubValue = styled.span`
  margin-left: 0.2rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.currentTheme.textSecondary};
`;
