import { useEffect, useState } from 'react';

import { defaultShadow } from '@/components/atoms/Button';
import { SelctedBuddy } from '@/components/pages/walk/GoWalk';
import { getcurrentLocation, loadKakaoMapScript } from '@/helper/kakaoMapHelpers';
import closeIcon from '@public/assets/icons/closeIcon.png';
import mapMarkerImage from '@public/images/mapMarker.png';

export type PositionType = [number, number];

export const defaultPosition: PositionType = [33.450701, 126.570667];

interface UseKakaoMapProps {
  mapRef: React.RefObject<HTMLDivElement>;
  buddys: SelctedBuddy[];
  isTargetClicked: boolean;
  setIsTargetClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useKakaoMap = ({ mapRef, buddys, isTargetClicked, setIsTargetClicked }: UseKakaoMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<PositionType>(defaultPosition);
  const [changedPosition, setchangedPosition] = useState<PositionType>(defaultPosition);

  const createOverLayElement = (buddys: SelctedBuddy[]) => {
    // 커스텀 오버레이 생성
    const customContents = document.createElement('div');
    customContents.className = 'wrap';
    customContents.style.cssText = `
            background-color: #1B1D1F;
            display: flex;
            gap: 0.3rem;
            padding: 0.5rem 1rem;
            border-radius: 3rem;
            box-shadow: ${defaultShadow};
            align-items: center;
          `;

    const ImageCssText = 'width: 2rem; height: 2rem; border-radius: 50%; border: 0.2rem solid white;';
    buddys.forEach(({ img }) => {
      const profileImage = document.createElement('img');
      profileImage.src = img;
      profileImage.style.cssText = ImageCssText;
      customContents.appendChild(profileImage);
    });

    const closeButton = document.createElement('img');
    closeButton.src = closeIcon;
    closeButton.style.cssText = 'width: 0.8rem; height: 0.8rem; margin-left: 0.5rem; cursor: pointer;';
    customContents.appendChild(closeButton);

    return { customContents, closeButton };
  };

  const createMarker = (currentLocation: PositionType, mapInstance: kakao.maps.Map) => {
    const imageSize = new kakao.maps.Size(65, 65);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };
    const markerImage = new kakao.maps.MarkerImage(mapMarkerImage, imageSize, imageOption);

    const markerPosition = new window.kakao.maps.LatLng(currentLocation[0], currentLocation[1]);

    const newMarker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
      map: mapInstance,
    });

    return newMarker;
  };

  const createCustomOverLay = (newMarker: kakao.maps.Marker, mapInstance: kakao.maps.Map, buddys: SelctedBuddy[]) => {
    const { customContents, closeButton } = createOverLayElement(buddys);
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
  };

  const moveMapToPosition = (map: kakao.maps.Map, position: PositionType) => {
    // 이동할 위도 경도 위치를 생성합니다
    const moveLatLon = new kakao.maps.LatLng(position[0], position[1]);
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
  };

  const isPositionsDifferent = (currentPosition: PositionType, changedPosition: PositionType) =>
    !currentPosition.every((value, index) => value === changedPosition[index]);

  useEffect(() => {
    if (isTargetClicked && isPositionsDifferent(currentPosition, changedPosition) && map) {
      moveMapToPosition(map, currentPosition);
      setIsTargetClicked(false);
    }
  }, [isTargetClicked]);

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

          // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
          kakao.maps.event.addListener(mapInstance, 'center_changed', function () {
            //const level = mapInstance.getLevel(); // 지도의  레벨을 얻어옵니다
            const center = mapInstance.getCenter(); // 지도의 중심좌표를 얻어옵니다
            const lat = center.getLat(); // 위도
            const lng = center.getLng(); // 경도
            setchangedPosition([lat, lng]);
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
