import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import { flexRowCenter } from '@/styles/layoutStyles';

export default function PeriodFilter() {
  const commonStyles = { borderRadius: '3rem', height: '3rem' };
  return (
    <FilterWrapper>
      <Button style={commonStyles}>주</Button>
      <Button style={commonStyles}>월</Button>
      <Button style={commonStyles}>전체</Button>
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  ${flexRowCenter}
  gap: 1rem;
  margin: 1rem 0;
`;
