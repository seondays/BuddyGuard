import { defaultShadow } from '@/components/atoms/Button';
import { DEFAULT_MAP_POSITION } from '@/constants/map';
import { KAKAOMAP_API_SRC } from '@/constants/urlConstants';
import { SetOverlayProps } from '@/hooks/useKakaoMap';
import { BuddysType, PositionPair, PositionType, SelectedBuddysType } from '@/types/map';
import closeIcon from '@public/assets/icons/closeIcon.png';
import mascot from '@public/assets/images/mascot.png';
import mapMarkerImage from '@public/images/mapMarker.png';

/** 마커의 새로운 위치로 오버레이 이동 */
export const replaceCustomOverLay = ({ overlayRef, markerRef }: Pick<SetOverlayProps, 'overlayRef' | 'markerRef'>) => {
  if (!(overlayRef.current && markerRef.current)) return;
  overlayRef.current.setPosition(markerRef.current.getPosition());
};

/** 오버레이 셋팅 */
export const setOverlay = ({
  isStarted,
  selectedBuddys,
  markerRef,
  overlayRef,
  map: mapInstance,
  customContents,
  closeButton,
}: SetOverlayProps) => {
  // 기존 오버레이가 있으면 위치만 업데이트
  if (overlayRef.current && markerRef.current) {
    replaceCustomOverLay({ overlayRef, markerRef });
    return;
  }

  if (!(isStarted === 'start' && selectedBuddys.length && markerRef.current && mapInstance)) return;

  const overlay = createCustomOverLay(customContents, markerRef.current, mapInstance);
  overlayRef.current = overlay;

  // 닫기 버튼 이벤트 추가
  closeButton.addEventListener('click', () => {
    overlay.setMap(null);
  });
  // 마커 클릭 시 오버레이 표시
  kakao.maps.event.addListener(markerRef.current, 'click', function () {
    overlay.setMap(mapInstance);
  });
};

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

/** 지도의 중심좌표를 얻어오는 이벤트리스너 */
export const centerChangedEventListener = (
  mapInstance: kakao.maps.Map,
  setChangedPosition: React.Dispatch<React.SetStateAction<PositionType | null>>
) => {
  const center = mapInstance.getCenter(); // 지도의 중심좌표를 얻어옵니다
  setChangedPosition([center.getLat(), center.getLng()]); //[위도,경도]
};

/** 스크립트 로드 후 지도 생성 */
export const createMap = (
  currentLocation: PositionType,
  mapRef: React.RefObject<HTMLDivElement>,
  setChangedPosition: React.Dispatch<React.SetStateAction<PositionType | null>>,
  level?: number
) => {
  const mapOptions = {
    center: new window.kakao.maps.LatLng(currentLocation[0], currentLocation[1]),
    level: level || 3,
  };
  const mapInstance = new kakao.maps.Map(mapRef.current as HTMLElement, mapOptions);

  // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(mapInstance, 'center_changed', () =>
    centerChangedEventListener(mapInstance, setChangedPosition)
  );

  return mapInstance;
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

export const createStartEndMarker = (
  currentLocation: PositionType,
  mapInstance: kakao.maps.Map,
  type: 'start' | 'end'
) => {
  const markerColor = type === 'start' ? '#FF0000' : '#20dd20';
  const markerPosition = new window.kakao.maps.LatLng(currentLocation[0], currentLocation[1]);

  const dotOverlay = new kakao.maps.CustomOverlay({
    content: `<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #FFFFFF;"></div>`,
    position: markerPosition,
    map: mapInstance,
    yAnchor: 0.5,
  });

  return dotOverlay;
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

export const createOverLayElement = (SelectedBuddys: SelectedBuddysType, buddys: BuddysType[]) => {
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

  const filterdBuddys = buddys.filter(({ id }) => SelectedBuddys.includes(id));

  const ImageCssText =
    'width: 2rem; height: 2rem; border-radius: 50%; border: 0.2rem solid white; background-color:beige';
  filterdBuddys.forEach(({ img }) => {
    const profileImage = document.createElement('img');
    profileImage.src = img === 'none' ? mascot : img;
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
