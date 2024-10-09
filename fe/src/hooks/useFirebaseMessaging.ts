import { useEffect } from 'react';

import { requestPermission, onMessageListener } from '@/firebase';

interface NotificationPayload {
  notification?: {
    title: string;
    body: string;
  };
}

// payload가 NotificationPayload 타입인지 검사하는 함수
const isNotificationPayload = (payload: unknown): payload is NotificationPayload => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'notification' in payload &&
    typeof (payload as NotificationPayload).notification?.title === 'string'
  );
};

const useFirebaseMessaging = () => {
  useEffect(() => {
    let unsubscribe: () => void;

    const setupFCM = async () => {
      try {
        // FCM 푸시 알림 권한 요청
        await requestPermission();

        // 푸시 알림 수신 시 처리 로직
        const payload = await onMessageListener();
        // payload가 NotificationPayload 타입인지 확인
        if (!isNotificationPayload(payload)) {
          console.error('올바르지 않은 payload 형식:', payload);
          return;
        }

        console.log('푸시 메시지 수신:', payload);
        // 여기서 알림을 사용자에게 표시
        alert(`푸시 알림 수신: ${payload.notification?.title}`);
      } catch (err) {
        console.log('FCM 초기화 실패 또는 알림 수신 실패:', err);
      }
    };

    setupFCM();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
};

export default useFirebaseMessaging;
