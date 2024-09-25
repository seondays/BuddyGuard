import { useCallback, useEffect, useRef, useState } from 'react';

import {
  createCustomOverLay,
  createMarker,
  getcurrentLocation,
  getMapPosition,
  isPositionsDifferent,
  loadKakaoMapScript,
  moveMapTo,
} from '@/helper/kakaoMapHelpers';
import { PositionPair, PositionType, SelctedBuddy } from '@/types/map';

export const defaultPosition: PositionType = [33.450701, 126.570667];

interface UseKakaoMapProps {
  mapRef: React.RefObject<HTMLDivElement>;
  buddys: SelctedBuddy[];
  isTargetClicked: boolean;
  setIsTargetClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isStarted: boolean;
}

export const useKakaoMap = ({ mapRef, buddys, isTargetClicked, setIsTargetClicked, isStarted }: UseKakaoMapProps) => {
  const simulateIntervalID = useRef<NodeJS.Timeout | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [changedPosition, setChangedPosition] = useState<PositionType | null>(null);
  const [positions, setPositions] = useState<PositionPair>({
    previous: null, // 초기에는 이전 위치가 없으므로 null
    current: defaultPosition, // 기본 위치를 현재 위치로 설정
  });

  const centerChangedEventListener = useCallback((mapInstance: kakao.maps.Map) => {
    const center = mapInstance.getCenter(); // 지도의 중심좌표를 얻어옵니다
    setChangedPosition([center.getLat(), center.getLng()]); //[위도,경도]
  }, []);

  /** 임의의 위치 업데이트 함수 */
  const simulateLocationUpdate = () => {
    const intervalId = setInterval(() => {
      // console.log('🎈');
      setPositions((prev) => {
        const currentPosition = prev.current;
        const updatedPosition: PositionType = [
          currentPosition[0] + Math.random() * 0.001,
          currentPosition[1] + Math.random() * 0.001,
        ];
        return { previous: currentPosition, current: updatedPosition };
      });
    }, 2000);

    return intervalId;
  };

  // 위치 업데이트 인터벌 관리
  useEffect(() => {
    if (!isStarted) return;

    simulateIntervalID.current = simulateLocationUpdate();

    return () => {
      if (simulateIntervalID.current) {
        clearInterval(simulateIntervalID.current);
        simulateIntervalID.current = null;
      }
    };
  }, [isStarted]);

  // 위치가 변경되었을 때 지도 중심 이동 (지도 다시 초기화하지 않음)
  useEffect(() => {
    if (map && positions.previous) {
      // console.log('👓위치 이동!');
      const moveLatLon = getMapPosition(positions);
      setChangedPosition(() => [positions.current[0], positions.current[1]]);
      moveMapTo(map, moveLatLon, 3);
    }
  }, [positions, map]);

  // 타겟버튼 클릭 시 현재 위치로 지도 이동
  useEffect(() => {
    if (isTargetClicked && isPositionsDifferent(positions, changedPosition) && map) {
      const moveLatLon = getMapPosition(positions);
      setIsTargetClicked(() => false);
      setChangedPosition(() => [positions.current[0], positions.current[1]]);
      moveMapTo(map, moveLatLon, 3);
    }
  }, [isTargetClicked, positions, changedPosition, map, setIsTargetClicked]);

  // 최초에만 Kakao Map을 초기화 (초기 한 번만 실행)
  useEffect(() => {
    const initMap = async () => {
      try {
        // console.log('🎇initMap');
        // 스크립트 로드
        await loadKakaoMapScript();

        // 위치 가져오기
        const currentLocation = await getcurrentLocation();
        setPositions((prev) => ({ ...prev, current: currentLocation }));

        // 지도 생성
        if (!(window.kakao && mapRef.current)) return;
        window.kakao.maps.load(() => {
          const mapOptions = {
            center: new window.kakao.maps.LatLng(currentLocation[0], currentLocation[1]),
            level: 3,
          };
          const mapInstance = new kakao.maps.Map(mapRef.current as HTMLElement, mapOptions);

          // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
          kakao.maps.event.addListener(mapInstance, 'center_changed', () => centerChangedEventListener(mapInstance));

          setMap(mapInstance);

          // 마커이미지, 오버레이 생성
          const newMarker = createMarker(currentLocation, mapInstance);
          createCustomOverLay(newMarker, mapInstance, buddys);
        });
      } catch (error) {
        console.error('Map initialization error', error);
      }
    };

    // 최초 실행
    if (!map) initMap();

    return () => {
      if (map) kakao.maps.event.removeListener(map, 'center_changed', centerChangedEventListener);
    };
  }, [mapRef, map, buddys, centerChangedEventListener]);

  useEffect(() => {
    const handleResize = () => {
      if (!map) return;
      map.relayout();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [map]);

  return map;
};
