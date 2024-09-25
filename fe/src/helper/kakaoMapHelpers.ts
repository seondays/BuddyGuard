import { defaultShadow } from '@/components/atoms/Button';
import { KAKAOMAP_API_SRC } from '@/constants/urlConstants';
import { defaultPosition } from '@/hooks/useKakaoMap';
import { PositionType, SelctedBuddy } from '@/types/map';
import closeIcon from '@public/assets/icons/closeIcon.png';
import mapMarkerImage from '@public/images/mapMarker.png';

export const createCustomOverLay = (
  newMarker: kakao.maps.Marker,
  mapInstance: kakao.maps.Map,
  buddys: SelctedBuddy[]
) => {
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
      resolve(defaultPosition);
      return;
    }

    navigator.geolocation.watchPosition(
      ({ coords }) => {
        if (!coords) {
          resolve(defaultPosition);
          return;
        }
        const latitude = coords.latitude;
        const longitude = coords.longitude;

        if (!(latitude && longitude)) {
          resolve(defaultPosition);
          return;
        }
        resolve([latitude, longitude]);
      },
      (error) => {
        console.error(error);
        resolve(defaultPosition); // 에러 발생 시 기본 위치 반환
      }
    );
  });
};

// navigator.geolocation.clearWatch(watchID); //위치 추적 종료
