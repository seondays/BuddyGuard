import styled from 'styled-components';

import { getTimeFormatString } from '@/helper/timerHelpers';
import useStopWatch from '@/hooks/useStopWatch';

import { StatusOfTime } from './WalkSatusBar';

interface StopWatchProps {
  className?: string;
  children?: React.ReactNode;
  status: StatusOfTime;
}

export default function StopWatch({ className, children, status }: StopWatchProps) {
  const time = useStopWatch(status);

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
