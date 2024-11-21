import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { DEFAULT_MAP_POSITION } from '@/constants/map';
import {
  centerChangedEventListener,
  createMap,
  createMarker,
  getcurrentLocation,
  loadKakaoMapScript,
} from '@/helper/kakaoMapHelpers';
import { fillAvailable } from '@/styles/layoutStyles';
import { PositionPair, PositionType } from '@/types/map';

import { StyledWalkWrapper } from './GoWalk';

export default function WalkRefactor() {
  const linePathRef = useRef<kakao.maps.LatLng[]>([]);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [changedPosition, setChangedPosition] = useState<PositionType | null>(null);

  const [positions, setPositions] = useState<PositionPair>({
    previous: null, // 초기에는 이전 위치가 없으므로 null
    current: DEFAULT_MAP_POSITION, // 기본 위치를 현재 위치로 설정
  });
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const overlayRef = useRef<kakao.maps.CustomOverlay | null>(null);
  const watchID = useRef<number | null>(null); // watchPosition ID

  // 디버깅용 코드
  let listenerCount = 0;
  const originalWatchPosition = navigator.geolocation.watchPosition;
  const originalGetCurrentPosition = navigator.geolocation.getCurrentPosition;

  // watchPosition 모니터링
  navigator.geolocation.watchPosition = function (...args) {
    listenerCount++;
    console.log(`watchPosition listener count: ${listenerCount}`);
    return originalWatchPosition.apply(this, args);
  };

  // getCurrentPosition 모니터링
  navigator.geolocation.getCurrentPosition = function (...args) {
    console.log('getCurrentPosition called once');
    return originalGetCurrentPosition.apply(this, args);
  };

  useEffect(() => {
    const initMap = async () => {
      console.log('initMap start');
      try {
        console.log('1. Before loadKakaoMapScript');
        //1. 스크립트 로드
        await loadKakaoMapScript();
        console.log('2. After loadKakaoMapScript');

        let currentLocation;
        try {
          console.log('3. Requesting location');
          // !!!!!!! 2. 위치 권한 상태 확인
          const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

          console.log('4. Location permission status:', permissionStatus.state);

          // 3. 위치 가져오기
          currentLocation = await getcurrentLocation();
          console.log('5. Location received:', currentLocation);
        } catch (locError) {
          console.warn('Location error:', locError);
          // 위치 권한이 거부된 경우에만 기본값 사용
          currentLocation = DEFAULT_MAP_POSITION;
        }

        // 4. 가져온 위치 셋팅
        setPositions((prev) => ({ ...prev, current: currentLocation }));

        if (!(window.kakao && mapRef.current)) return;

        window.kakao.maps.load(() => {
          const mapInstance = createMap(currentLocation, mapRef, setChangedPosition);
          const newMarker = createMarker(currentLocation, mapInstance);
          setMap(mapInstance);
          markerRef.current = newMarker;
        });
      } catch (error) {
        console.error('Map initialization error:', error);
      }
    };
    if (!map) initMap();

    return () => {
      // 필수적인 cleanup만 남기기
      if (map) {
        // 이벤트 리스너 제거
        kakao.maps.event.removeListener(map, 'center_changed', () =>
          centerChangedEventListener(map, setChangedPosition)
        );
        console.log('🧹 클린업1: 이벤트리스너 제거');

        // 마커 제거
        if (markerRef.current) {
          markerRef.current.setMap(null);
          markerRef.current = null;
          console.log('🧹 클린업2: 마커 제거');
        }

        // 메모리 누수 방지를 위한 map 인스턴스 제거
        setMap(null);
        console.log('🧹 클린업3: 맵 인스턴스 제거');
      }
    };
  }, [mapRef, map]);

  return (
    <StyledWalkWrapper>
      <StyledMap ref={mapRef} />
    </StyledWalkWrapper>
  );
}

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px; // 최소 높이 설정
  object-fit: cover;
  ${fillAvailable}
  background-color: aliceblue;
`;
