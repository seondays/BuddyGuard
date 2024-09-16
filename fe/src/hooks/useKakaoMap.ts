import { useEffect, useState } from 'react';

import { loadKakaoMapScript } from '@/helper/kakaoMapHelpers';

export const useKakaoMap = (mapRef: React.RefObject<HTMLDivElement>) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

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
  }, [mapRef]);

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
