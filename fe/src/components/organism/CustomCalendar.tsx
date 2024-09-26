import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import moment from 'moment';

moment.locale('ko');

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CustomCalendar() {
  const [date, setDate] = useState<Value>(null); // 초기값을 null로 설정하여 선택되지 않도록 함

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format('D')}
        formatYear={(locale, date) => moment(date).format('YYYY')}
        formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        locale="ko"
      />
    </StyledCalendarWrapper>
  );
}

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }

  // 전체 폰트 컬러
  .react-calendar__month-view {
    abbr {
      color: ${(props) => props.theme.gray_1};
    }
  }

  // 요일 밑줄 제거
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  // 일요일에만 빨간 폰트
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title='일요일'] {
    color: red;
  }
  .react-calendar__tile--now {
    background-color: gray;
    opacity: 50%;
    border-radius: 0.3rem;
    position: relative;

    abbr {
      color: white;
    }

    // 오늘 아래에 '오늘' 텍스트 추가
    &::after {
      content: '오늘';
      position: absolute;
      bottom: 0rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.6rem;
      color: white;
      white-space: nowrap;
    }
  }

  // 선택한 날짜에 빨간색 배경
  .react-calendar__tile--active {
    background-color: red;
    border-radius: 0.2rem;
    abbr {
      color: white;
    }
  }

  // 네비게이션 가운데 정렬
  .react-calendar__navigation {
    justify-content: center;
  }

  // 네비게이션 폰트 설정
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  // 네비게이션 버튼 컬러
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  // 네비게이션 비활성화 됐을때 스타일
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: ${(props) => props.theme.darkBlack};
  }

  // 년/월 상단 네비게이션 칸 크기 줄이기
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  // 선택한 날짜 스타일 적용
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: gray;
    border-radius: 0.2rem;
  }

  // 일 날짜 간격
  .react-calendar__tile {
    padding: 5px 0px 18px;
    position: relative;
  }

  // 네비게이션 월 스타일 적용
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.gray_1};
  }
`;

const StyledCalendar = styled(Calendar)``;
