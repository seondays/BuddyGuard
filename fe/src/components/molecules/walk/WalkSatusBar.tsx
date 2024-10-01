import styled from 'styled-components';

import PauseIcon from '@/components/icons/PauseIcon';
import PlayIcon from '@/components/icons/PlayIcon';
import StopIcon from '@/components/icons/StopIcon';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
import { StatusOfTime, TimeRef } from '@/types/map';
import { getCurrentDate } from '@/utils/timeUtils';

import StopWatch from './StopWatch';

const WALK_STATUS_BAR_HEIGHT = '8rem';
interface WalkStatusBarProps {
  walkStatus: StatusOfTime;
  setWalkStatus: React.Dispatch<React.SetStateAction<StatusOfTime>>;
  timeRef: React.MutableRefObject<TimeRef>;
}
export default function WalkSatusBar({ walkStatus, setWalkStatus, timeRef }: WalkStatusBarProps) {
  const pauseHandler = () => setWalkStatus('pause');
  const stopHandler = () => {
    setWalkStatus('stop');
    timeRef.current.end.time = getCurrentDate(false, true);
    timeRef.current.end.day = getCurrentDate(true, false);
  };
  const playHandler = () => setWalkStatus('start');

  return (
    <StyledStatusBar>
      <StyledStopWatch status={walkStatus} timeRef={timeRef}>
        시간
      </StyledStopWatch>
      <StyledIconWrapper>
        {walkStatus === 'start' && <PauseIcon onClick={pauseHandler} />}
        {(walkStatus === 'stop' || walkStatus === 'pause') && <PlayIcon onClick={playHandler} />}
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
