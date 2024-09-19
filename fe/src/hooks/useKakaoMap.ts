import { useEffect, useState } from 'react';

import { getcurrentLocation, loadKakaoMapScript } from '@/helper/kakaoMapHelpers';
import profile01 from '@public/images/profile01.png';

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

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지의 주소입니다
          const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
          const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          // const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
          const markerImage = new kakao.maps.MarkerImage(profile01, imageSize, imageOption);

          // 마커가 표시될 위치
          const markerPosition = new window.kakao.maps.LatLng(currentLocation[0], currentLocation[1]);

          const newMarker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // 마커이미지 설정
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
