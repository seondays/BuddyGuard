import { useEffect, useState } from 'react';

import { getcurrentLocation, loadKakaoMapScript } from '@/helper/kakaoMapHelpers';

export type PositionType = [number, number];

export const defaultPosition: PositionType = [33.450701, 126.570667];

export const useKakaoMap = (mapRef: React.RefObject<HTMLDivElement>) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<PositionType>(defaultPosition);
  const [marker, setMarker] = useState<kakao.maps.Marker | null>(null);

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
        setCurrentPosition(currentLocation);

        // 지도 생성
        if (!(window.kakao && mapRef.current)) return;
        window.kakao.maps.load(() => {
          //지도를 생성할 때 필요한 기본 옵션(지도의 중심좌표,지도의 레벨(확대, 축소 정도))
          const mapOptions = {
            center: new window.kakao.maps.LatLng(currentPosition[0], currentPosition[1]), //지도의 중심좌표
            level: 3,
          };
          if (!mapRef.current) return;
          const mapInstance = new kakao.maps.Map(mapRef.current as HTMLElement, mapOptions); //지도 생성 및 객체 리턴
          setMap(mapInstance);

          // const markerPosition = new kakao.maps.LatLng(currentPosition[0], currentPosition[1]); // 마커가 표시될 위치
          const markerPosition = new window.kakao.maps.LatLng(currentLocation[0], currentLocation[1]);
          const newMarker = new kakao.maps.Marker({
            position: markerPosition,
          });
          newMarker.setMap(mapInstance);
          setMarker(newMarker);
          // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
          // newMarker.setMap(null);
        });
      } catch (error) {
        console.error('Map initialization error', error);
      }
    };

    initMap();
  }, [mapRef, currentPosition]);

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
