import { useRef } from 'react';
import styled from 'styled-components';

import PlayIcon from '@/components/icons/PlayIcon';
import BuddySelectBar from '@/components/molecules/BuddySelectBar';
import { useKakaoMap } from '@/hooks/useKakaoMap';

const playIconStyle = {
  $stroke: 'white',
  $shadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
  $isCursor: true,
};

export default function GoWalk() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useKakaoMap(mapRef);

  return (
    <StyledWalkWrapper>
      <StyledPlayIcon customStyle={playIconStyle} />
      <StyledMap ref={mapRef}></StyledMap>
      <BuddySelectBar />
    </StyledWalkWrapper>
  );
}
const StyledWalkWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
`;

const StyledMap = styled.div`
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

const StyledPlayIcon = styled(PlayIcon)`
  position: absolute;
  z-index: 999;
  bottom: 500px;
`;
