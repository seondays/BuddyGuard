import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { StatusOfTime } from './WalkSatusBar';

interface StopWatchProps {
  className?: string;
  children?: React.ReactNode;
  status: StatusOfTime;
}

export default function StopWatch({ className, children, status }: StopWatchProps) {
  const [time, setTime] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const startTimer = () => {
    timeoutRef.current = window.setTimeout(() => {
      setTime((prev) => prev + 1);
      startTimer();
    }, 1000);
  };

  const stopTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (status === 'start') {
      startTimer();
      return;
    }

    if (status === 'pause') {
      stopTimer();
      return;
    }

    if (status === 'stop') {
      stopTimer();
      setTime(0);
    }

    return () => stopTimer();
  }, [status]);

  const getTimeFormatString = (time: number) => {
    const hour = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0');
    const min = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return `${hour}:${min}:${sec}`;
  };

  return (
    <StyledStopWatchWrapper className={className}>
      {children}
      <div>{getTimeFormatString(time)}</div>
    </StyledStopWatchWrapper>
  );
}

const StyledStopWatchWrapper = styled.div`
  display: flex;

  & * {
    color: white;
  }
`;
