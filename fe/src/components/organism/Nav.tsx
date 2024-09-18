import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../atoms/Image';
import Span from '../atoms/Span';

const navItems = [
  { to: '/', src: '/assets/icons/home.png', label: '홈' },
  { to: '/menu/walk', src: '/assets/icons/walk.png', label: '산책' },
  { to: '/menu', src: '/assets/icons/menu.png', label: '메뉴' },
  { to: '/notification', src: '/assets/icons/notification.png', label: '알림' },
  { to: '/MyPage', src: '/assets/icons/myPage.png', label: '내 정보' },
];

export default function Nav() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '4rem',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTop: '0.1rem solid black',
      }}
    >
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            flexBasis: '20%',
          }}
        >
          <Image src={item.src} style={{ fontSize: '0.8rem', width: '1.5rem' }} />
          <Span>{item.label}</Span>
        </Link>
      ))}
    </div>
  );
}
