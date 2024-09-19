import { useState } from 'react';

import NotificationItem from '@/components/molecules/NotificationItem';
import NotificationPopup from '@/components/molecules/NotificationModal';

export default function NotificationList() {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const notifications = [
    {
      title: '알림 1',
      time: '5분 전',
      content:
        '이것은 알림 내용 예시입니다. 아주 긴 내용입니다. 긴 내용은 잘립니다. 이것은 알림 내용 예시입니다. 아주 긴 내용입니다. 긴 내용은 잘립니다. 이것은 알림 내용 예시입니다. 아주 긴 내용입니다. 긴 내용은 잘립니다.',
    },
    { title: '알림 2', time: '10분 전', content: '알림 내용 예시 2번' },
    {
      title: '알림 3',
      time: '1시간 전',
      content: '긴 알림 내용 예시입니다. 이 내용은 칸을 벗어나서 ...으로 표시됩니다.',
    },
    { title: '알림 4', time: '어제', content: '알림 내용 예시 4번' },
    { title: '알림 5', time: '2일 전', content: '알림 내용 예시 5번' },
    { title: '알림 6', time: '3일 전', content: '긴 내용이 포함된 알림입니다. 이것도 자를 필요가 있습니다.' },
    { title: '알림 7', time: '4일 전', content: '알림 내용 예시 7번' },
    { title: '알림 8', time: '5일 전', content: '알림 내용 예시 8번' },
    { title: '알림 9', time: '6일 전', content: '알림 내용 예시 9번' },
    {
      title: '알림 10',
      time: '1주일 전',
      content: '이것은 매우 긴 알림 내용입니다. 페이지에 맞추기 위해 잘려야 합니다.',
    },
  ];

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {notifications.map((notification, index) => (
        <NotificationItem
          key={index}
          title={notification.title}
          time={notification.time}
          content={notification.content}
          onClick={() => handleNotificationClick(notification)}
        />
      ))}

      {isPopupOpen && selectedNotification && (
        <NotificationPopup
          title={selectedNotification.title}
          time={selectedNotification.time}
          content={selectedNotification.content}
          onClose={closePopup}
        />
      )}
    </div>
  );
}
