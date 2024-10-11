import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import { flexRowCenter } from '@/styles/layoutStyles';
import { clickedFilterType } from '@/types/walk';

interface PeriodFilterProps {
  clickedFilter: clickedFilterType;
  setClickedFilter: React.Dispatch<React.SetStateAction<clickedFilterType>>;
}
export default function PeriodFilter({ clickedFilter, setClickedFilter }: PeriodFilterProps) {
  const commonStyles = { borderRadius: '3rem', height: '2.5rem' };

  const handleClick = (type: keyof clickedFilterType) => {
    setClickedFilter({
      week: false,
      month: false,
      all: false,
      [type]: true,
    });
  };
  return (
    <FilterWrapper>
      <Button style={commonStyles} $isClicked={clickedFilter.week} onClick={() => handleClick('week')}>
        주
      </Button>
      <Button style={commonStyles} $isClicked={clickedFilter.month} onClick={() => handleClick('month')}>
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
