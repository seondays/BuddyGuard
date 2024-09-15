import React from 'react';
import Image from '../atoms/Image';
import Div from '../atoms/Div';

export default function Nav() {
  return (
    <Div
      display="flex"
      width="100%"
      backgroundColor="red"
      height="3rem"
      position="fixed"
      bottom="0"
      justifyContent="space-around"
      alignItems="center"
    >
      <Image src="/assets/icons/home.png" width="2rem" bottomText="홈" />
      <Image src="/assets/icons/alert.png" width="2rem" bottomText="알림" />
      <Image src="/assets/icons/menu.png" width="2rem" bottomText="메뉴" />
      <Image src="/assets/icons/myPage.png" width="2rem" bottomText="마이페이지" />
      <Image src="/assets/icons/notification.png" width="2rem" bottomText="알림" />
    </Div>
  );
}
