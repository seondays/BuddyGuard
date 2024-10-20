import dayjs from 'dayjs';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import { useFilterStore } from '@/stores/useFilterStore';
import { flexRowCenter } from '@/styles/layoutStyles';
import { FilterType } from '@/types/walk';

export default function PeriodFilter() {
  const { type, setWeekly, setMonthly, setMonth, setAll } = useFilterStore();

  const commonStyles = { borderRadius: '3rem', height: '2.3rem' };

  const handleClick = (type: FilterType) => {
    if (type === 'weekly') setWeekly();
    if (type === 'monthly') {
      setMonthly();
      setMonth(dayjs().month() + 1);
    }
    if (type === 'all') setAll(dayjs().month() + 1, dayjs().year());
  };

  return (
    <FilterWrapper>
      {/* <Button style={commonStyles} $isClicked={type === 'weekly'} onClick={() => handleClick('weekly')}>
        주
      </Button>
      <Button style={commonStyles} $isClicked={type === 'monthly'} onClick={() => handleClick('monthly')}>
        월
      </Button>
      <Button style={commonStyles} $isClicked={type === 'all'} onClick={() => handleClick('all')}>
        전체
      </Button> */}

      <button onClick={() => handleClick('weekly')}>주</button>
      <button onClick={() => handleClick('weekly')}>월</button>
      <button onClick={() => handleClick('weekly')}>전체</button>
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  ${flexRowCenter}
  gap: 1rem;
  padding: 0.3rem;
  & * {
    font-size: 0.8rem;
  }
`;
