import { Link, useLocation } from 'react-router-dom';
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
  const {
    backgroundPrimary: navBgColor,
    textPrimary: navTextColor,
    textAccentSecondary: activeColor,
  } = theme.currentTheme;
  const location = useLocation();

  return (
    <StyledNavContainer style={{ backgroundColor: navBgColor, color: navTextColor }}>
      {navItems.map(({ to, Icon, label }) => {
        const isActive = location.pathname === to;
        return (
          <StyledNavLink key={to} to={to}>
            <StyledIcon as={Icon} $isActive={isActive} $activeColor={activeColor} />
            <StyledNavText $color={isActive ? activeColor : navTextColor}>{label}</StyledNavText>
          </StyledNavLink>
        );
      })}
    </StyledNavContainer>
  );
}

const StyledNavText = styled(Span)<{ $color: string }>`
  font-size: 0.9rem;
  color: ${({ $color }) => $color};
`;

const StyledNavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-basis: 20%;
  text-decoration: none;
`;

const StyledNavContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${NAV_HEIGHT};
  justify-content: space-around;
  align-items: center;
`;

const StyledIcon = styled.svg<{ $isActive: boolean; $activeColor: string }>`
  width: 1.7rem;
  height: 1.7rem;

  & path {
    fill: ${({ theme, $isActive, $activeColor }) => ($isActive ? $activeColor : theme.currentTheme.textPrimary)};
  }
`;
