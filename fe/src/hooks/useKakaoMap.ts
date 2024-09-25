import { useCallback, useEffect, useRef, useState } from 'react';

import {
  createCustomOverLay,
  createMarker,
  createOverLayElement,
  createPolyline,
  drawPolylineOnMap,
  getcurrentLocation,
  getMapPosition,
  isPositionsDifferent,
  loadKakaoMapScript,
  moveMapTo,
} from '@/helper/kakaoMapHelpers';
import { PositionPair, PositionType, SelctedBuddy, StatusOfTime } from '@/types/map';

export const defaultPosition: PositionType = [33.450701, 126.570667];

interface UseKakaoMapProps {
  mapRef: React.RefObject<HTMLDivElement>;
  buddys: SelctedBuddy[];
  isTargetClicked: boolean;
  setIsTargetClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isStarted: boolean;
  walkStatus: StatusOfTime;
}

export const useKakaoMap = ({
  mapRef,
  buddys,
  isTargetClicked,
  setIsTargetClicked,
  isStarted,
  walkStatus,
}: UseKakaoMapProps) => {
  const simulateIntervalID = useRef<NodeJS.Timeout | null>(null);
  const linePathRef = useRef<kakao.maps.LatLng[]>([]);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const overlayRef = useRef<kakao.maps.CustomOverlay | null>(null);
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

  const updatePosition = useCallback((prev: PositionPair): PositionPair => {
    const currentPosition = prev.current;
    const updatedPosition: PositionType = [
      currentPosition[0] + Math.random() * 0.001,
      currentPosition[1] + Math.random() * 0.001,
    ];

    const newLatLng = new kakao.maps.LatLng(updatedPosition[0], updatedPosition[1]);

    // linePath에 좌표 추가
    linePathRef.current.push(newLatLng);

    // 마커+오버레이 위치 변경
    markerRef.current?.setPosition(newLatLng);
    overlayRef.current?.setPosition(newLatLng);

    return { previous: currentPosition, current: updatedPosition };
  }, []);

  /** 선을 지도에 그리는 함수 */
  const handleDrawPolyline = useCallback(() => {
    if (map && linePathRef.current.length > 1) {
      const polyline = createPolyline(linePathRef.current);
      drawPolylineOnMap(map, polyline);
    }
  }, [map]);

  /** 임의의 위치 업데이트 함수 */
  const simulateLocationUpdate = useCallback(() => {
    const intervalId = setInterval(() => {
      // 위치 업데이트
      setPositions(updatePosition);
      // 지도에 경로 선 그리기
      handleDrawPolyline();
    }, 2000);

    return intervalId;
  }, [handleDrawPolyline, updatePosition]);

  const clearSimulate = () => {
    if (!simulateIntervalID.current) return;
    clearInterval(simulateIntervalID?.current);
    simulateIntervalID.current = null;
  };

  // 일시 중지
  useEffect(() => {
    if (walkStatus === 'pause' && simulateIntervalID.current) clearSimulate();
  }, [walkStatus]);

  // 위치 업데이트 인터벌 관리
  useEffect(() => {
    if (!isStarted) return;
    if (walkStatus === 'stop' || walkStatus === 'pause') return;
    simulateIntervalID.current = simulateLocationUpdate();

    return () => {
      if (simulateIntervalID.current) clearSimulate();
    };
  }, [isStarted, simulateLocationUpdate, walkStatus]);

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
          markerRef.current = createMarker(currentLocation, mapInstance);
          const { customContents, closeButton } = createOverLayElement(buddys);
          const overlay = createCustomOverLay(customContents, markerRef.current, mapInstance);
          overlayRef.current = overlay;

          // 닫기 버튼에 클릭 이벤트를 추가
          closeButton.addEventListener('click', () => {
            overlay.setMap(null);
          });

          kakao.maps.event.addListener(markerRef.current, 'click', function () {
            overlay.setMap(mapInstance);
          });

          overlayRef.current = overlay;
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
