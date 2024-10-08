import { useRef, useState } from 'react';
import styled from 'styled-components';

import PlayIcon from '@/components/icons/PlayIcon';
import WalkBuddySelectBar, { BUDDY_SELECTBAR_HEIGHT } from '@/components/molecules/walk/WalkBuddySelectBar';
import WalkSatusBar from '@/components/molecules/walk/WalkSatusBar';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
import WalkModal from '@/components/organisms/walk/WalkModal';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import {
  BuddysType,
  CheckboxChangeHandler,
  PositionType,
  SelectedBuddysType,
  StatusOfTime,
  TimeRef,
} from '@/types/map';
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
export const initTimeRef: TimeRef = { start: { day: '', time: '' }, end: { day: '', time: '' }, total: '' };
export type IsStartedType = 'ready' | 'start' | 'done';

// TODO(Woody): API 연결
export const buddys: BuddysType[] = [
  {
    id: 1,
    img: `${profile01}`,
    name: '우디',
  },
  {
    id: 2,
    img: `${profile02}`,
    name: '수잔',
  },
  {
    id: 3,
    img: `${profile03}`,
    name: '데이',
  },
  {
    id: 4,
    img: `${profile01}`,
    name: '진',
  },
  {
    id: 5,
    img: `${profile02}`,
    name: '잔',
  },
  {
    id: 6,
    img: `${profile03}`,
    name: '심바',
  },
];
export default function GoWalk() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef<TimeRef>(initTimeRef);
  const linePathRef = useRef<kakao.maps.LatLng[]>([]);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [changedPosition, setChangedPosition] = useState<PositionType | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // 캡처된 이미지를 저장할 상태
  const [isStarted, setIsStarted] = useState<IsStartedType>('ready');
  const [selectedBuddys, setSelectedBuddys] = useState<SelectedBuddysType>([]); // 클릭한 버디
  const [buddyList, setBuddyList] = useState<BuddysType[]>(buddys);
  const [isTargetClicked, setIsTargetClicked] = useState(false);
  const [walkStatus, setWalkStatus] = useState<StatusOfTime>('start');

  useKakaoMap({
    mapRef,
    buddyList,
    selectedBuddys,
    isTargetClicked,
    setIsTargetClicked,
    isStarted,
    setIsStarted,
    walkStatus,
    setCapturedImage,
    canvasRef,
    linePathRef,
    changedPosition,
    setChangedPosition,
    map,
    setMap,
  });

  const startGoWalk = () => {
    if (!selectedBuddys.length) {
      alert('산책할 버디를 선택해주세요! (임시 alert)');
      return;
    }
    setIsStarted('start');
    timeRef.current.start.day = getCurrentDate(true, false);
    timeRef.current.start.time = getCurrentDate(false, true);
  };

  const selectBuddy: CheckboxChangeHandler = (selectId: number, isSelect) =>
    setSelectedBuddys((prev) => (isSelect ? [...prev, selectId] : prev.filter((buddyId) => buddyId !== selectId)));

  return (
    <>
      <StyledWalkWrapper>
        {isStarted === 'ready' && <StyledBlockLayer />}
        {isStarted === 'ready' && <StyledPlayIcon customStyle={playIconStyle} onClick={startGoWalk} />}
        {isStarted === 'start' && (
          <StyledTargetIcon onClick={() => setIsTargetClicked((prev) => !prev)}>
            <img src={targetIcon} />
          </StyledTargetIcon>
        )}
        <StyledMap ref={mapRef} />
        <canvas ref={canvasRef} style={{ display: 'none' }} /> {/* 캔버스는 숨김 */}
        {isStarted === 'start' && (
          <WalkSatusBar walkStatus={walkStatus} setWalkStatus={setWalkStatus} timeRef={timeRef} />
        )}
        {isStarted === 'ready' && (
          <WalkBuddySelectBar buddys={buddys} selectedBuddys={selectedBuddys} handleOnChange={selectBuddy} />
        )}
        {isStarted === 'done' && (
          <WalkModal
            formTitle={'산책 완료'}
            timeRef={timeRef}
            linePathRef={linePathRef}
            selectedBuddys={selectedBuddys}
            buddyList={buddyList}
            canvasRef={canvasRef}
            changedPosition={changedPosition}
            map={map}
          />
        )}
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

export const StyledWalkWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
