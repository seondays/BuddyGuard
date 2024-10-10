import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';

import Image from '@/components/atoms/Image';
import Span from '@/components/atoms/Span';

export const NAV_HEIGHT = '4rem';

const navItems = [
  { to: '/', src: '/assets/icons/home.png', label: '홈' },
  { to: '/menu/walk/go', src: '/assets/icons/walk.png', label: '산책' },
  { to: '/menu', src: '/assets/icons/menu.png', label: '메뉴' },
  { to: '/notification', src: '/assets/icons/notification.png', label: '알림' },
  { to: '/MyPage', src: '/assets/icons/myPage.png', label: '내 정보' },
];

export default function Nav() {
  const theme = useTheme();
  const { backgroundPrimary: navBgColor, textPrimary: navTextColor } = theme.currentTheme;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: NAV_HEIGHT,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: navBgColor,
        color: navTextColor,
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
          <Span $color={navTextColor}>{item.label}</Span>
        </Link>
      ))}
    </div>
  );
}
