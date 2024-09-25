import { useEffect, useState } from 'react';

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
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [changedPosition, setChangedPosition] = useState<PositionType | null>(null);

  const [positions, setPositions] = useState<PositionPair>({
    previous: null, // 초기에는 이전 위치가 없으므로 null
    current: defaultPosition, // 기본 위치를 현재 위치로 설정
  });

  // const addCurrentPosition = (currentLocation: [number, number]) => {
  //   setCurrentPositions((prevPositions) => {
  //     const lastPosition = prevPositions[prevPositions.length - 1];
  //     if (lastPosition[0] === currentLocation[0] && lastPosition[1] === currentLocation[1]) {
  //       return prevPositions;
  //     } else {
  //       return [...prevPositions, currentLocation];
  //     }
  //   });
  // };

  /** 임의의 위치 업데이트 함수 */
  // const simulateLocationUpdate = () => {
  //   setInterval(() => {
  //     console.log('🎈');
  //     const lastPosition = currentPositions[currentPositions.length - 1];
  //     const updatedLocation: PositionType = [
  //       lastPosition[0] + Math.random() * 0.001,
  //       lastPosition[1] + Math.random() * 0.001,
  //     ];
  //     addCurrentPosition(updatedLocation);
  //     // setChangedPosition((prevPosition) => [
  //     //   prevPosition[0] + Math.random() * 0.001, // 위도 변경
  //     //   prevPosition[1] + Math.random() * 0.001, // 경도 변경
  //     // ]);
  //   }, 2000);
  // };

  // useEffect(() => {
  //   if (isStarted) simulateLocationUpdate();
  // }, [isStarted]);

  useEffect(() => {
    if (isTargetClicked && isPositionsDifferent(positions, changedPosition) && map) {
      const moveLatLon = getMapPosition(positions);
      moveMapTo(map, moveLatLon, 2);
      setIsTargetClicked(false);
    }
  }, [isTargetClicked, positions, changedPosition, map, setIsTargetClicked]);

  useEffect(() => {
    const loadScript = async () => {
      try {
        await loadKakaoMapScript();
        if (!(window.kakao && mapRef.current)) return;
      } catch (error) {
        console.error('Kakao Map script load error', error);
      }
    };
    loadScript();
  }, [mapRef]);

  useEffect(() => {
    const initMap = async () => {
      try {
        // 위치 가져오기
        const currentLocation = await getcurrentLocation();

        setPositions((prev) => ({ ...prev, current: currentLocation }));

        // 지도 생성
        if (!(window.kakao && mapRef.current)) return;
        window.kakao.maps.load(() => {
          // 지도의 중심좌표, 지도의 레벨(확대, 축소 정도)
          const mapOptions = {
            center: new window.kakao.maps.LatLng(positions.current[0], positions.current[1]),
            level: 3,
          };

          if (!mapRef.current) return;

          const mapInstance = new kakao.maps.Map(mapRef.current as HTMLElement, mapOptions);

          // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
          kakao.maps.event.addListener(mapInstance, 'center_changed', function () {
            const center = mapInstance.getCenter(); // 지도의 중심좌표를 얻어옵니다
            const lat = center.getLat(); // 위도
            const lng = center.getLng(); // 경도
            setChangedPosition([lat, lng]);
          });

          setMap(mapInstance);

          // 마커이미지, 오버레이 생성
          const newMarker = createMarker(currentLocation, mapInstance);
          createCustomOverLay(newMarker, mapInstance, buddys);
        });
      } catch (error) {
        console.error('Map initialization error', error);
      }
    };

    initMap();
  }, [mapRef, positions]);

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
