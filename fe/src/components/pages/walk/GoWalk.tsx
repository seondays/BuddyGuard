import { useRef, useState } from 'react';
import styled from 'styled-components';

import PlayIcon from '@/components/icons/PlayIcon';
import BuddySelectBar, { BUDDY_SELECTBAR_HEIGHT } from '@/components/molecules/BuddySelectBar';
import { NAV_HEIGHT } from '@/components/organism/Nav';
import { useKakaoMap } from '@/hooks/useKakaoMap';

const playIconStyle = {
  $stroke: 'white',
  $shadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
  $isCursor: true,
};

const PLAY_ICON_GAP = '5rem';

export default function GoWalk() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  useKakaoMap(mapRef);

  return (
    <>
      <StyledWalkWrapper>
        <StyledBlockLayer />
        <StyledPlayIcon customStyle={playIconStyle} onClick={() => setIsStarted(true)} />
        <StyledMap ref={mapRef}></StyledMap>
        <BuddySelectBar />
      </StyledWalkWrapper>
    </>
  );
}

const StyledBlockLayer = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  background-color: gray;
  opacity: 50%;
  min-width: 100%;
  min-height: 100%;
`;

const StyledMap = styled.div`
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

const StyledPlayIcon = styled(PlayIcon)`
  position: absolute;
  z-index: 999;
  bottom: calc(${NAV_HEIGHT} + ${BUDDY_SELECTBAR_HEIGHT} + ${PLAY_ICON_GAP});
  left: 50%;
  transform: translateX(-50%);
`;

const StyledWalkWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
