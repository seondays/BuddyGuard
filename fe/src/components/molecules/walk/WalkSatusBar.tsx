import { useState } from 'react';
import styled from 'styled-components';

import PlayIcon from '@/components/icons/PlayIcon';
import { NAV_HEIGHT } from '@/components/organism/Nav';

import StopWatch from './StopWatch';

export type StatusOfTime = 'start' | 'pause' | 'stop';

const WALK_STATUS_BAR_HEIGHT = '8rem';

export default function WalkSatusBar() {
  const [status, setStatus] = useState<StatusOfTime>('start');

  return (
    <StyledStatusBar>
      <StyledStopWatch status={status}>시간</StyledStopWatch>
      <StyledIconWrapper>
        <PlayIcon />
        <PlayIcon />
      </StyledIconWrapper>
    </StyledStatusBar>
  );
}

const StyledStopWatch = styled(StopWatch)`
  color: white;
`;

const StyledIconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 70%;
`;

const StyledStatusBar = styled.div`
  position: absolute;
  bottom: ${NAV_HEIGHT};
  z-index: 1;
  gap: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: ${WALK_STATUS_BAR_HEIGHT};

  background-color: ${({ theme }) => theme.themeValues.colorValues.grayscale[800]};
  opacity: 80%;
  padding: 1rem;
`;
