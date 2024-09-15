import { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';
import Nav from '@/components/organism/Nav';
import { HOME_DESCRIPTION_TEXT1, HOME_DESCRIPTION_TEXT2 } from '@/constants/textConstants';

interface ResponsiveLayoutProps {
  children: ReactNode;
}
// TODO: 레이아웃, 다크모드 토글 버튼, 소개글
export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const { toggleDarkMode } = useTheme();

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
            <Nav />
          </StyledMobileFrame>
          <StyledToggleTheme onClick={toggleDarkMode}>🌗</StyledToggleTheme>
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
  width: 50px;
  height: 50px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledDescriptionArea = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: right;
  font-size: 2rem;
  font-weight: bold;
  margin-right: 2rem;

  & div {
    color: ${({ theme }) => theme.currentTheme.textPrimary};
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledMobileFrame = styled.div`
  position: relative;
  width: 390px; // iPhone 12 기준
  height: 844px;
  max-width: 440px; // iPhone 16 Pro Max 기준
  max-height: 956px;
  margin: 0 auto;
  overflow: hidden;

  @media (min-width: 440px) {
    border: 0.3rem solid ${({ theme }) => theme.themeValues.colorValues.grayscale[600]};
    border-radius: 1rem;
  }
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
`;
