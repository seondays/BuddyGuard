import { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';

import { HOME_DESCRIPTION_TEXT } from '@/constants/textConstants';

interface ResponsiveLayoutProps {
  children: ReactNode;
}
// TODO: 레이아웃, 다크모드 토글 버튼, 소개글
export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const { toggleDarkMode } = useTheme();

  return (
    <StyledScreenWrapper>
      <StyledContentWrapper>
        <DescriptionArea>{HOME_DESCRIPTION_TEXT}</DescriptionArea>
        <StyledMobileFrame>
          {children}
          <StyledToggleTheme onClick={toggleDarkMode}>🌗</StyledToggleTheme>
        </StyledMobileFrame>
      </StyledContentWrapper>
    </StyledScreenWrapper>
  );
}

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

const DescriptionArea = styled.div`
  text-align: right;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  margin-right: 2rem;

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
