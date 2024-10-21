import dayjs from 'dayjs';
import styled from 'styled-components';

import { useFilterStore } from '@/stores/useFilterStore';
import { flexColumnCenter, flexRowCenter } from '@/styles/layoutStyles';
import { FilterType } from '@/types/walk';

export default function PeriodFilter() {
  const { type, setWeekly, setMonthly, setMonth, setAll } = useFilterStore();

  const handleClick = (type: FilterType) => {
    console.log(type);
    if (type === 'weekly') setWeekly();
    if (type === 'monthly') {
      setMonthly();
      setMonth(dayjs().month() + 1);
    }
    if (type === 'all') setAll(dayjs().month() + 1, dayjs().year());
  };

  return (
    <StyledFilterWrapper>
      <StyledFilterButton onClick={() => handleClick('weekly')} $isClicked={type === 'weekly'}>
        주
      </StyledFilterButton>
      <StyledFilterButton onClick={() => handleClick('monthly')} $isClicked={type === 'monthly'}>
        월
      </StyledFilterButton>
      <StyledFilterButton onClick={() => handleClick('all')} $isClicked={type === 'all'}>
        전체
      </StyledFilterButton>
    </StyledFilterWrapper>
  );
}

const StyledFilterButton = styled.button<{ $isClicked: boolean }>`
  ${flexColumnCenter}
  width: 100%;
  min-height: 2rem;
  border-radius: 3rem;
  border: ${({ theme }) => `${theme.themeValues.colorValues.special.textForce02} solid 0.1rem`};
  font-size: 1rem;
  color: ${({ theme }) => theme.themeValues.colorValues.grayscale[900]};
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ $isClicked, theme }) =>
    $isClicked ? theme.themeValues.colorValues.special.modalBg : 'white'};
  box-shadow: ${({ $isClicked, theme }) =>
    $isClicked ? `0.1rem 0.15rem 0.25rem ${theme.currentTheme.shadow}` : 'none'};
  transform: ${({ $isClicked }) => ($isClicked ? 'translateY(-2px)' : 'none')};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.themeValues.colorValues.special.modalBg};
  }
`;

const StyledFilterWrapper = styled.div`
  ${flexRowCenter}
  gap: 1rem;
  padding: 0.3rem;
  & * {
    font-size: 0.8rem;
  }
`;
