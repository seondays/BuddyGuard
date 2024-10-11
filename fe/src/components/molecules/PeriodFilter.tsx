import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import { flexRowCenter } from '@/styles/layoutStyles';
import { clickedFilterType } from '@/types/walk';

interface PeriodFilterProps {
  clickedFilter: clickedFilterType;
  setClickedFilter: React.Dispatch<React.SetStateAction<clickedFilterType>>;
  fetchWalkRecord: (type: keyof clickedFilterType) => void;
}
export default function PeriodFilter({ clickedFilter, setClickedFilter, fetchWalkRecord }: PeriodFilterProps) {
  const commonStyles = { borderRadius: '3rem', height: '2.5rem' };

  const handleClick = (type: keyof clickedFilterType) => {
    setClickedFilter({
      weekly: false,
      monthly: false,
      all: false,
      [type]: true,
    });

    fetchWalkRecord(type === 'all' ? 'monthly' : type);
  };

  return (
    <FilterWrapper>
      <Button style={commonStyles} $isClicked={clickedFilter.weekly} onClick={() => handleClick('weekly')}>
        주
      </Button>
      <Button style={commonStyles} $isClicked={clickedFilter.monthly} onClick={() => handleClick('monthly')}>
        월
      </Button>
      <Button style={commonStyles} $isClicked={clickedFilter.all} onClick={() => handleClick('all')}>
        전체
      </Button>
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  ${flexRowCenter}
  gap: 1rem;
  margin: 0.5rem 0;
`;
