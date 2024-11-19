import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { fetchAccessToken } from '@/apis/authAPI';
import PlayIcon from '@/components/icons/PlayIcon';
import WalkBuddySelectBar, { BUDDY_SELECTBAR_HEIGHT } from '@/components/molecules/walk/WalkBuddySelectBar';
import WalkSatusBar from '@/components/molecules/walk/WalkSatusBar';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
import WalkModal from '@/components/organisms/walk/WalkModal';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { fillAvailable } from '@/styles/layoutStyles';
import {
  BuddysType,
  CheckboxChangeHandler,
  PositionType,
  SelectedBuddysType,
  StatusOfTime,
  TimeRef,
} from '@/types/map';
import { PetInfo } from '@/types/pet';
import { getCurrentDate } from '@/utils/timeUtils';
import targetIcon from '@public/assets/icons/targetIcon.png';

const playIconStyle = {
  $stroke: 'white',
  $shadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
  $isCursor: true,
  $size: 110,
};

const PLAY_ICON_GAP = '5rem';
export const initTimeRef: TimeRef = {
  start: { day: new Date(), time: '' },
  end: { day: new Date(), time: '' },
  total: '',
};
export type IsStartedType = 'ready' | 'start' | 'done';

const getTitlePetId = () => {
  const petsStorage = localStorage.getItem('petsStorage');
  if (!petsStorage) return [];
  const titleBuddyId = JSON.parse(petsStorage)?.state?.selectedBuddy?.petId;
  return titleBuddyId ? [titleBuddyId] : [];
};

export default function GoWalk() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef<TimeRef>(initTimeRef);
  const linePathRef = useRef<kakao.maps.LatLng[]>([]);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [changedPosition, setChangedPosition] = useState<PositionType | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // 캡처된 이미지를 저장할 상태
  const [isStarted, setIsStarted] = useState<IsStartedType>('ready');
  const [selectedBuddys, setSelectedBuddys] = useState<SelectedBuddysType>(getTitlePetId()); // 클릭한 버디
  const [buddyList, setBuddyList] = useState<BuddysType[]>([{ id: 0, img: '', name: '' }]);
  const [isTargetClicked, setIsTargetClicked] = useState(false);
  const [walkStatus, setWalkStatus] = useState<StatusOfTime>('start');

  const navigate = useNavigate();

  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // 디버깅용 코드를 useEffect 안으로 이동
  useEffect(() => {
    let listenerCount = 0;
    const originalWatchPosition = navigator.geolocation.watchPosition;
    const originalGetCurrentPosition = navigator.geolocation.getCurrentPosition;

    // watchPosition 모니터링
    navigator.geolocation.watchPosition = function (...args) {
      try {
        listenerCount++;
        const log = `watchPosition count: ${listenerCount}`;
        console.log(log);
        setDebugLogs((prev) => [...prev, log].slice(-5));
        return originalWatchPosition.apply(this, args);
      } catch (error) {
        console.error('watchPosition error:', error);
        return originalWatchPosition.apply(this, args);
      }
    };

    // getCurrentPosition 모니터링
    navigator.geolocation.getCurrentPosition = function (...args) {
      try {
        const timestamp = new Date().toLocaleTimeString();
        const log = `getCurrentPosition (${timestamp})`;
        console.log(log);
        setDebugLogs((prev) => [...prev, log].slice(-5));
        return originalGetCurrentPosition.apply(this, args);
      } catch (error) {
        console.error('getCurrentPosition error:', error);
        return originalGetCurrentPosition.apply(this, args);
      }
    };

    // cleanup
    return () => {
      navigator.geolocation.watchPosition = originalWatchPosition;
      navigator.geolocation.getCurrentPosition = originalGetCurrentPosition;
    };
  }, []); // 컴포넌트 마운트 시에만 실행

  useEffect(() => {
    const petsStorage = localStorage.getItem('petsStorage');
    if (!petsStorage) return;
    const buddysList = JSON.parse(petsStorage)?.state?.petsInfo?.map(({ petId, petName, profileImage }: PetInfo) => ({
      id: petId,
      img: profileImage,
      name: petName,
    }));
    if (buddysList) {
      setBuddyList(buddysList);
    }
  }, []);

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
    if (!buddyList.length) {
      message.info('버디를 등록해주세요!');
      navigate('/MyPage/AddBuddy');
      return;
    }
    if (!selectedBuddys.length) {
      message.warning('산책할 버디를 선택해주세요!');
      return;
    }
    setIsStarted('start');
    // timeRef.current.start.day = getCurrentDate({ isDay: true, isTime: false });
    timeRef.current.start.day = new Date();
    timeRef.current.start.time = getCurrentDate({ isDay: false, isTime: true });
  };

  const selectBuddy: CheckboxChangeHandler = (selectId: number, isSelect) =>
    setSelectedBuddys((prev) => (isSelect ? [...prev, selectId] : prev.filter((buddyId) => buddyId !== selectId)));

  const handleLocalStorage = () => {
    const isPetStorage = localStorage.getItem('petsStorage');
    const isAccessToken = localStorage.getItem('accessToken');
    const petsStorage =
      '{"state":{"petsInfo":[{"userId":3,"petId":54,"petName":"우디","profileImage":"none"},{"userId":3,"petId":55,"petName":"렉스","profileImage":"none"}],"selectedBuddy":{"userId":3,"petId":54,"petName":"우디","profileImage":"none"}},"version":0}';
    const accessToken =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJST0xFX1VTRVIiLCJ0b2tlblR5cGUiOiJBQ0NFU1MiLCJpYXQiOjE3MzE1NzExNTcsImV4cCI6NjE3MzE1NzExNTd9.e4a7VaULNJY475Le_DnYflT7KLITHQAlOP3VP4AzQL0';
    if (!isPetStorage) {
      localStorage.setItem('petsStorage', petsStorage);
      message.warning('PetStorage has been set!');
    }
    if (!isAccessToken) {
      localStorage.setItem('accessToken', accessToken);
      message.warning('AccessToken has been set!');
    }

    if (isPetStorage && isAccessToken) {
      message.warning('이미 둘다 있슴다!');
    }
  };

  return (
    <StyledWalkWrapper>
      <button id="setToken" onClick={handleLocalStorage} style={{ zIndex: 9999999, position: 'absolute', top: 0 }}>
        {' '}
        로컬스토리지 셋팅
      </button>
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
        <WalkBuddySelectBar buddys={buddyList} selectedBuddys={selectedBuddys} handleOnChange={selectBuddy} />
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
      <StyledDebugPanel>
        <StyledDebugTitle>Debug Logs</StyledDebugTitle>
        <StyledDebugContent>
          {debugLogs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </StyledDebugContent>
      </StyledDebugPanel>
    </StyledWalkWrapper>
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
  width: 100%;
  height: 100%;
  min-height: 400px; // 최소 높이 설정
  object-fit: cover;
  ${fillAvailable}
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
  ${fillAvailable}
`;

const StyledDebugPanel = styled.div`
  position: absolute;
  bottom: 100px;
  right: 10px;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  z-index: 9999;
  max-height: 150px;
  width: 60%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  & * {
    color: #fff;
  }
`;

const StyledDebugTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 3px;
`;

const StyledDebugContent = styled.div`
  font-size: 11px;
  overflow-y: auto;
  max-height: 120px;

  & > div {
    margin: 2px 0;
    padding: 2px 5px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`;
