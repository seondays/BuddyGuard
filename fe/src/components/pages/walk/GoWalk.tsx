import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import PlayIcon from '@/components/icons/PlayIcon';
import WalkBuddySelectBar, { BUDDY_SELECTBAR_HEIGHT } from '@/components/molecules/walk/WalkBuddySelectBar';
import WalkSatusBar from '@/components/molecules/walk/WalkSatusBar';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { CheckboxChangeHandler, SelctedBuddy, StatusOfTime, TimeRef } from '@/types/map';
import { getCurrentDate } from '@/utils/timeUtils';
import targetIcon from '@public/assets/icons/targetIcon.png';
import profile01 from '@public/images/profile01.png';
import profile02 from '@public/images/profile02.png';
import profile03 from '@public/images/profile03.png';

const playIconStyle = {
  $stroke: 'white',
  $shadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
  $isCursor: true,
  $size: 110,
};

const PLAY_ICON_GAP = '5rem';

export default function GoWalk() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef<TimeRef>({ start: '', end: '', total: '' });
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // 캡처된 이미지를 저장할 상태
  const [isStarted, setIsStarted] = useState(false);
  const [selectedBuddys, setSelectedBuddys] = useState<string[]>([]);
  const [isTargetClicked, setIsTargetClicked] = useState(false);
  const [walkStatus, setWalkStatus] = useState<StatusOfTime>('start');

  // TODO(Woody): API 연결
  const buddys: SelctedBuddy[] = [{ img: profile01 }, { img: profile02 }, { img: profile03 }];

  useKakaoMap({
    mapRef,
    buddys,
    isTargetClicked,
    setIsTargetClicked,
    isStarted,
    walkStatus,
    setCapturedImage,
    canvasRef,
  });

  const startGoWalk = () => {
    if (!selectedBuddys.length) {
      alert('산책할 버디를 선택해주세요! (임시 alert)');
      return;
    }
    setIsStarted(true);
    const startTime = getCurrentDate(false, true);
    timeRef.current.start = startTime;
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
        {isStarted && (
          <StyledTargetIcon onClick={() => setIsTargetClicked((prev) => !prev)}>
            <img src={targetIcon} />
          </StyledTargetIcon>
        )}
        <StyledMap ref={mapRef} />
        <canvas ref={canvasRef} style={{ display: 'none' }} /> {/* 캔버스는 숨김 */}
        {isStarted ? (
          <WalkSatusBar walkStatus={walkStatus} setWalkStatus={setWalkStatus} timeRef={timeRef} />
        ) : (
          <WalkBuddySelectBar selectedBuddys={selectedBuddys} handleOnChange={selectBuddy} />
        )}
        {/* {capturedImage && ( */}
        <StyledBlockLayer2>
          <img src={capturedImage || targetIcon} alt="Captured Map" style={{ width: '100%', maxWidth: '600px' }} />
        </StyledBlockLayer2>
        {/* )} */}
      </StyledWalkWrapper>
    </>
  );
}

const StyledTargetIcon = styled.div`
  position: absolute;
  z-index: 999;
  left: 1rem;
  bottom: calc(${NAV_HEIGHT} + ${BUDDY_SELECTBAR_HEIGHT});
  background-color: white;
  border: 0.2rem solid grey;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  cursor: pointer;

  & img {
    width: 80%;
    height: 80%;
  }
`;

const StyledBlockLayer2 = styled.div`
  position: absolute;
  top: 0;
  z-index: 999;
  min-width: 100%;
  min-height: 50%;
`;
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
