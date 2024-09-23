import { useEffect, useState } from 'react';

import { getcurrentLocation, loadKakaoMapScript } from '@/helper/kakaoMapHelpers';
import closeIcon from '@public/assets/icons/closeIcon.png';
import mapMarkerImage from '@public/images/mapMarker.png';
import profile01 from '@public/images/profile01.png';
import profile02 from '@public/images/profile02.png';

export type PositionType = [number, number];

export const defaultPosition: PositionType = [33.450701, 126.570667];

export const useKakaoMap = (mapRef: React.RefObject<HTMLDivElement>) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<PositionType>(defaultPosition);

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
          // 지도의 중심좌표, 지도의 레벨(확대, 축소 정도)
          const mapOptions = {
            center: new window.kakao.maps.LatLng(currentPosition[0], currentPosition[1]),
            level: 3,
          };

          if (!mapRef.current) return;
          const mapInstance = new kakao.maps.Map(mapRef.current as HTMLElement, mapOptions);
          setMap(mapInstance);

          // 마커이미지 생성
          const imageSize = new kakao.maps.Size(65, 65);
          const imageOption = { offset: new kakao.maps.Point(27, 69) };
          const markerImage = new kakao.maps.MarkerImage(mapMarkerImage, imageSize, imageOption);

          const markerPosition = new window.kakao.maps.LatLng(currentLocation[0], currentLocation[1]);

          const newMarker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
            map: mapInstance,
          });

          // 커스텀 오버레이 생성
          const customContents = document.createElement('div');
          customContents.className = 'wrap';
          customContents.style.cssText = `
            background-color: #1B1D1F;
            display: flex;
            gap: 0.3rem;
            padding: 0.5rem 1rem;
            border-radius: 3rem;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          `;

          const profileImage1 = document.createElement('img');
          profileImage1.src = profile01;
          profileImage1.style.cssText = 'width: 2rem; height: 2rem; border-radius: 50%; border: 0.2rem solid white;';

          const profileImage2 = document.createElement('img');
          profileImage2.src = profile02;
          profileImage2.style.cssText = 'width: 2rem; height: 2rem; border-radius: 50%; border: 0.2rem solid white;';

          const closeButton = document.createElement('img');
          closeButton.src = closeIcon;
          closeButton.style.cssText = 'width: 0.8rem; height: 0.8rem; margin-left: 0.2rem; cursor: pointer;';

          customContents.appendChild(profileImage1);
          customContents.appendChild(profileImage2);
          customContents.appendChild(closeButton);

          const overlay = new kakao.maps.CustomOverlay({
            content: customContents,
            map: mapInstance,
            position: newMarker.getPosition(),
            xAnchor: 0,
            yAnchor: 2,
          });

          // 닫기 버튼에 클릭 이벤트를 추가
          closeButton.addEventListener('click', () => {
            overlay.setMap(null);
          });

          kakao.maps.event.addListener(newMarker, 'click', function () {
            overlay.setMap(mapInstance);
          });
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
