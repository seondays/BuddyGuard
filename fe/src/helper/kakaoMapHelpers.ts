import { KAKAOMAP_API_SRC } from '@/constants/urlConstants';
import { defaultPosition, PositionType } from '@/hooks/useKakaoMap';

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
