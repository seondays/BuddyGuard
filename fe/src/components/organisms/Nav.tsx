import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import Span from '@/components/atoms/Span';
import Notification from '@/svg/nav_icon_bell.svg';
import Home from '@/svg/nav_icon_home.svg';
import GoWalk from '@/svg/nav_icon_map.svg';
import menu from '@/svg/nav_icon_menu.svg';
import MyPage from '@/svg/nav_icon_people.svg';

export const NAV_HEIGHT = '4rem';

const navItems = [
  { to: '/', Icon: Home, label: '홈' },
  { to: '/menu/walk/go', Icon: GoWalk, label: '산책' },
  { to: '/menu', Icon: menu, label: '메뉴' },
  { to: '/notification', Icon: Notification, label: '알림' },
  { to: '/MyPage', Icon: MyPage, label: '내 정보' },
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
      {navItems.map(({ to, Icon, label }) => (
        <Link
          key={to}
          to={to}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            flexBasis: '20%',
          }}
        >
          <StyledIcon as={Icon} />
          <Span $color={navTextColor}>{label}</Span>
        </Link>
      ))}
    </div>
  );
}

const StyledIcon = styled.svg`
  width: 1.7rem;
  height: 1.7rem;

  & path {
    fill: ${({ theme }) => theme.currentTheme.textPrimary};
  }
`;
