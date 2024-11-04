// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  console.log('푸시 알림 권한 요청 중...');
  try {
    const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
    if (token) {
      console.log('FCM Token:', token);
      return token; // FCM 토큰을 반환하거나 백엔드에 저장하는 로직
    } else {
      console.log('FCM Token을 가져올 수 없습니다.');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      // error 객체에 code 속성이 있는지 검사
      const errWithCode = error as { code?: string }; // error에 code가 있는지 추정
      if (errWithCode.code === 'messaging/permission-blocked') {
        console.error('사용자가 푸시 알림 권한을 차단했습니다.');
        alert('알림 권한이 차단되었습니다. 브라우저 설정에서 권한을 허용해 주세요.');
        /**
         * 크롬에서 권한을 확인하는 방법:
          주소창 왼쪽에 자물쇠 아이콘을 클릭합니다.
          "사이트 설정"을 선택합니다.
          "알림" 설정이 "차단됨"으로 되어 있다면 "허용"으로 변경합니다.
         * 
         */
      } else {
        console.error('FCM Token 요청 중 오류 발생:', error.message);
      }
    } else {
      console.error('알 수 없는 오류 발생:', error);
    }
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
