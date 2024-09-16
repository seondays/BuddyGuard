import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { KAKAOMAP_API_SRC } from '@/constants/urlConstants';

export default function GoWalk() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const loadKakaoMapScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('kakao-map-script')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src = KAKAOMAP_API_SRC;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Kakao Map script load failed'));
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        await loadKakaoMapScript();
        if (!(window.kakao && mapRef.current)) return;

        window.kakao.maps.load(() => {
          //지도를 생성할 때 필요한 기본 옵션
          const mapOptions = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
            level: 3, //지도의 레벨(확대, 축소 정도)
          };
          const mapInstance = new kakao.maps.Map(mapRef.current as HTMLElement, mapOptions); //지도 생성 및 객체 리턴
          setMap(mapInstance);
        });
      } catch (error) {
        console.error(error);
      }
    };

    initializeMap();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!map) return;
      map.relayout();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [map]);

  return (
    <StyledWalkWrapper>
      <StyledMap ref={mapRef}></StyledMap>
    </StyledWalkWrapper>
  );
}
const StyledWalkWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: aliceblue;
`;
const StyledMap = styled.div`
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;
