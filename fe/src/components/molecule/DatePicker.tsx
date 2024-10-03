import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import CommonCalendar from './CommonCalendar';

moment.locale('ko');

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  size?: InputSizeType;
  $widthPercent?: number;
}

type InputSizeType = 'small' | 'medium' | 'large';

const inputTypography: { [key in InputSizeType]: string } = {
  small: '0.7rem',
  medium: '0.9rem',
  large: '1.3rem',
};

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, size = 'medium', $widthPercent = 100 }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [time, setTime] = useState<string>(value ? moment(value).format('HH:mm') : '12:00');

  const handleDateChange = (formattedDate: string) => {
    const newDate = moment(`${formattedDate} ${time}`, 'YYYY-MM-DD HH:mm').toDate();
    onChange(newDate);
    setIsCalendarOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);

    if (value) {
      const newDate = moment(value).format('YYYY-MM-DD');
      onChange(moment(`${newDate} ${newTime}`, 'YYYY-MM-DD HH:mm').toDate());
    }
  };

  const formattedDate = value ? moment(value).format('YYYY년 M월 D일') : '';

  return (
    <DateField $widthPercent={$widthPercent}>
      <InputWrapper>
        <StyledLabel size={size}>날짜</StyledLabel>
        <StyledInput size={size} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
          {formattedDate || '날짜를 선택해주세요'}
        </StyledInput>
      </InputWrapper>
      <InputWrapper>
        <StyledLabel size={size}>시간</StyledLabel>
        <TimeInput size={size} type="time" value={time} onChange={handleTimeChange} />
      </InputWrapper>

      {isCalendarOpen && (
        <StyledCalendarWrapper>
          <CommonCalendar onDateChange={handleDateChange} />
        </StyledCalendarWrapper>
      )}
    </DateField>
  );
};

const DateField = styled.div<{ $widthPercent: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ $widthPercent }) => `${$widthPercent}%`};
  position: relative;
`;

const StyledLabel = styled.label<{ size: InputSizeType }>`
  margin-bottom: 0.5rem;
  font-size: ${({ theme, size }) => theme.themeValues.typography[size]};
  color: ${({ theme }) => theme.currentTheme.textSecondary};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 1rem; */
  padding: 0.3rem 1rem;
`;

const StyledInput = styled.div<{ size: InputSizeType }>`
  font-size: ${({ size }) => inputTypography[size]};
  cursor: pointer;
  text-align: center;
`;

const StyledCalendarWrapper = styled.div`
  position: absolute;
  top: 3rem;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TimeInput = styled.input<{ size: InputSizeType }>`
  font-size: ${({ size }) => inputTypography[size]};
  border: none;
  background-color: white;
`;

export default DatePicker;
