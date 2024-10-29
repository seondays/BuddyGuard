import moment from 'moment';
import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import styled from 'styled-components';

const categoryColors: { [key: string]: string } = {
  건강: '#ff9999',
  산책: '#99ccff',
  식사: '#ffcc99',
  체중: '#A6C8DD',
  병원: '#ffb3b3',
  백신: '#ffb366',
};

interface Schedule {
  id: number;
  date: string;
  category: string;
  title: string;
  time: string;
  description: string;
  subCategory: string;
}

interface CommonCalendarProps {
  schedules?: Schedule[];
  onDateChange: (date: string) => void;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CommonCalendar: React.FC<CommonCalendarProps> = ({ schedules = [], onDateChange }) => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);

  const handleDateChange = (newDate: Value) => {
    let formattedDate;

    if (newDate instanceof Date) {
      formattedDate = moment(newDate).format('YYYY-MM-DD');
    } else if (Array.isArray(newDate) && newDate[0] instanceof Date) {
      formattedDate = moment(newDate[0]).format('YYYY-MM-DD');
    }

    setDate(newDate);

    if (formattedDate) {
      onDateChange(formattedDate);
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const schedule = schedules?.find((schedule) => schedule.date === formattedDate);
    return schedule && view === 'month' ? <Dot color={categoryColors[schedule.category]} /> : null;
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={handleDateChange}
        tileContent={tileContent}
        formatDay={(_, date) => moment(date).format('D')}
        formatMonthYear={(_, date) => moment(date).format('YYYY. MM')}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        locale="ko"
      />
    </StyledCalendarWrapper>
  );
};

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }

  .react-calendar__tile {
    position: relative;
    padding: 1rem;
    text-align: center;
  }

  .react-calendar__tile--now {
    background-color: gray;
    opacity: 50%;
    border-radius: 0.3rem;
    abbr {
      color: white;
    }
  }

  .react-calendar__tile--active {
    border-radius: 0.2rem;
    abbr {
      color: white;
    }
  }

  .react-calendar__tile--hasActive {
    background-color: lightblue;
  }
`;

const StyledCalendar = styled(Calendar)`
  .react-calendar__tile {
    padding: 10px;
    position: relative;
  }

  .react-calendar__tile--active {
    background-color: #ffcc99;
    color: white;
    border-radius: 0.2rem;
  }

  .react-calendar__tile--now {
    background-color: #a0c1ff;
    color: white;
  }
`;

const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin: 0 auto;
`;

export default CommonCalendar;
