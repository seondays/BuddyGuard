import { useState } from 'react';
import styled from 'styled-components';

import PauseIcon from '@/components/icons/PauseIcon';
import PlayIcon from '@/components/icons/PlayIcon';
import StopIcon from '@/components/icons/StopIcon';
import { NAV_HEIGHT } from '@/components/organisms/Nav';

import StopWatch from './StopWatch';

export type StatusOfTime = 'start' | 'pause' | 'stop';

const WALK_STATUS_BAR_HEIGHT = '8rem';

export default function WalkSatusBar() {
  const [status, setStatus] = useState<StatusOfTime>('start');

  const pauseHandler = () => setStatus('pause');
  const stopHandler = () => setStatus('stop');
  const playHandler = () => setStatus('start');

  return (
    <StyledStatusBar>
      <StyledStopWatch status={status}>시간</StyledStopWatch>
      <StyledIconWrapper>
        {status === 'start' && <PauseIcon onClick={pauseHandler} />}
        {(status === 'stop' || status === 'pause') && <PlayIcon onClick={playHandler} />}
        <StopIcon onClick={stopHandler} />
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
  gap: 1rem;
  height: 100%;
`;

const StyledStatusBar = styled.div`
  position: absolute;
  bottom: ${NAV_HEIGHT};
  z-index: 1;
  gap: 0.5rem;

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
