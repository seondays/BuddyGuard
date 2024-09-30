import { defaultShadow } from '@/components/atoms/Button';
import { KAKAOMAP_API_SRC } from '@/constants/urlConstants';
import { DEFAULT_MAP_POSITION } from '@/constants/walk';
import { PositionPair, PositionType, SelctedBuddy } from '@/types/map';
import closeIcon from '@public/assets/icons/closeIcon.png';
import mapMarkerImage from '@public/images/mapMarker.png';

/** 전체경로가 보이도록 지도범위 재설정 */
export const adjustMapBounds = (map: kakao.maps.Map, linePath: kakao.maps.LatLng[]) => {
  const bounds = new kakao.maps.LatLngBounds();
  linePath.forEach((latLng) => {
    bounds.extend(latLng);
  });

  map.setBounds(bounds);
};

/** Polyline 지도에 추가 */
export const drawPolylineOnMap = (map: kakao.maps.Map, polyline: kakao.maps.Polyline) => polyline.setMap(map);

/** 이동경로를 받아 Polyline 객체를 생성 */
export const createPolyline = (path: kakao.maps.LatLng[]) => {
  return new kakao.maps.Polyline({
    path,
    strokeWeight: 5,
    strokeColor: '#FFAE00',
    strokeOpacity: 0.7,
    strokeStyle: 'solid',
    zIndex: 999,
  });
};

/** 이동한 위치와 현재 위치가 허용 오차를 초과하는지 비교 */
export const isPositionsDifferent = (
  { current }: PositionPair,
  changedPosition: PositionType | null,
  tolerance: number = 0.0001
) => {
  if (!changedPosition) return true;

  const [lat1, lng1] = current;
  const [lat2, lng2] = changedPosition;

  const latDiff = Math.abs(lat1 - lat2);
  const lngDiff = Math.abs(lng1 - lng2);

  return latDiff > tolerance || lngDiff > tolerance;
};

/** 지도 이동 */
export const moveMapTo = (map: kakao.maps.Map, moveLatLon: kakao.maps.LatLng, mapLevel: number) => {
  map.setLevel(mapLevel);
  map.panTo(moveLatLon);
};

/** 이동할 위도 경도 위치를 생성 */
export const getMapPosition = ({ current }: PositionPair) => {
  const moveLatLon = new kakao.maps.LatLng(current[0], current[1]);
  return moveLatLon;
};

export const createCustomOverLay = (
  customContents: HTMLDivElement,
  newMarker: kakao.maps.Marker,
  mapInstance: kakao.maps.Map
) => {
  const newOverlay = new kakao.maps.CustomOverlay({
    content: customContents,
    map: mapInstance,
    position: newMarker.getPosition(),
    xAnchor: 0,
    yAnchor: 2,
  });

  return newOverlay;
};

export const createMarker = (currentLocation: PositionType, mapInstance: kakao.maps.Map) => {
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

export const createOverLayElement = (buddys: SelctedBuddy[]) => {
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

export const loadKakaoMapScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('kakao-map-script')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = KAKAOMAP_API_SRC;
    script.onload = () => {
      console.log('Kakao Map script loaded successfully');
      resolve();
    };
    script.onerror = (error) => {
      console.error('Kakao Map script load failed', error);
      reject(new Error(`Kakao Map script load failed: ${error}`));
    };
    document.head.appendChild(script);
  });
};

/** 현재 위치 가져오기 */
export const getcurrentLocation = (): Promise<PositionType> => {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) {
      resolve(DEFAULT_MAP_POSITION);
      return;
    }

    navigator.geolocation.watchPosition(
      ({ coords }) => {
        if (!coords) {
          resolve(DEFAULT_MAP_POSITION);
          return;
        }
        const latitude = coords.latitude;
        const longitude = coords.longitude;

        if (!(latitude && longitude)) {
          resolve(DEFAULT_MAP_POSITION);
          return;
        }
        resolve([latitude, longitude]);
      },
      (error) => {
        console.error(error);
        resolve(DEFAULT_MAP_POSITION); // 에러 발생 시 기본 위치 반환
      }
    );
  });
};

// navigator.geolocation.clearWatch(watchID); //위치 추적 종료
