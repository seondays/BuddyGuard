import { message } from 'antd';
import { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';

import Nav from '@/components/organisms/Nav';
import { HOME_DESCRIPTION_TEXT1, HOME_DESCRIPTION_TEXT2 } from '@/constants/textConstants';
import { fillAvailable, flexColumn, flexRowCenter } from '@/styles/layoutStyles';

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const { toggleDarkMode } = useTheme();
  const handleDarkMode = () => {
    if (localStorage.getItem('theme') === 'light') {
      message.success('🌘 다크 모드로 변경되었습니다.');
    }
    if (localStorage.getItem('theme') === 'dark') {
      message.success('💡 라이트 모드로 변경되었습니다.');
    }
    toggleDarkMode();
  };

  return (
    <StyledScreenWrapper>
      <StyledContentWrapper>
        <StyledDescriptionArea>
          <div>{HOME_DESCRIPTION_TEXT1}</div>
          <div>{HOME_DESCRIPTION_TEXT2}</div>
        </StyledDescriptionArea>
        <StyledMain>
          <StyledMobileFrame>
            {children}
            <StyledNavWrapper>
              <Nav />
            </StyledNavWrapper>
          </StyledMobileFrame>
          <StyledToggleTheme onClick={handleDarkMode}>
            <div>🌗</div>
          </StyledToggleTheme>
        </StyledMain>
      </StyledContentWrapper>
    </StyledScreenWrapper>
  );
}

const StyledMain = styled.main`
  position: relative;
`;

const StyledToggleTheme = styled.button`
  z-index: 999;
  position: absolute;
  top: 1rem;
  left: -5.5rem;
  font-size: 1.5rem;
  background-color: #fff;
  border-radius: 50%;
  border: 0.1rem solid black;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  ${flexRowCenter}
  @media (max-width: 60rem) {
    display: none;
  }
`;

const StyledDescriptionArea = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-right: 2rem;

  & div {
    color: ${({ theme }) => theme.currentTheme.textPrimary};
  }

  // 화면 너비가 60rem(960px) 이하일 때 이 조건 적용
  @media (max-width: 60rem) {
    display: none;
  }
`;

export const StyledMobileFrame = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 30rem; //480px
  max-height: 60rem; //960px

  margin: 0 auto;
  overflow: hidden;

  ${flexColumn}

  // 화면 너비가 30rem(480px) 이상일 때 조건 적용
  @media (min-width: 30rem) {
    border: 0.3rem solid ${({ theme }) => theme.themeValues.colorValues.grayscale[600]};
    border-radius: 1rem;
    width: 95vw;
    height: 95vh;
  }

  ${fillAvailable}
`;

const StyledNavWrapper = styled.div`
  z-index: 9999;
  position: absolute;
  bottom: 0;
  width: 100%;
  min-width: 17rem;
  border-top: solid 0.2rem ${({ theme }) => theme.themeValues.colorValues.grayscale[600]};
`;

const StyledContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledScreenWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => {
    const { backgroundPrimary, textPrimary } = theme.currentTheme;
    return `
      background-color: ${backgroundPrimary};
      color: ${textPrimary};
    `;
  }}

  ${fillAvailable}

  & *:hover,
  *:focus {
    background-color: none !important;
  }
`;
