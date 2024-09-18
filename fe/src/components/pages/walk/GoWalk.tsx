import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import PlayIcon from '@/components/icons/PlayIcon';
import WalkBuddySelectBar, { BUDDY_SELECTBAR_HEIGHT } from '@/components/molecules/WalkBuddySelectBar';
import { NAV_HEIGHT } from '@/components/organism/Nav';
import { useKakaoMap } from '@/hooks/useKakaoMap';

const playIconStyle = {
  $stroke: 'white',
  $shadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
  $isCursor: true,
};

const PLAY_ICON_GAP = '5rem';

export interface CheckboxChangeHandler {
  (checkBoxId: string, isChecked: boolean): void;
}

export default function GoWalk() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedBuddys, setSelectedBuddys] = useState<string[]>([]);

  useKakaoMap(mapRef);

  const startGoWalk = () => {
    if (!selectedBuddys.length) {
      alert('산책할 버디를 선택해주세요! (임시 alert)');
      return;
    }
    setIsStarted(true);
  };

  const selectBuddy: CheckboxChangeHandler = (selectId, isSelect) => {
    setSelectedBuddys((prev) => (isSelect ? [...prev, selectId] : prev.filter((buddyId) => buddyId !== selectId)));
  };

  useEffect(() => {}, [isStarted]);

  return (
    <>
      <StyledWalkWrapper>
        {!isStarted && <StyledBlockLayer />}
        {!isStarted && <StyledPlayIcon customStyle={playIconStyle} onClick={startGoWalk} />}
        <StyledMap ref={mapRef}></StyledMap>
        {!isStarted && <WalkBuddySelectBar selectedBuddys={selectedBuddys} handleOnChange={selectBuddy} />}
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
