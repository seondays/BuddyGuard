import { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';

import Nav from '@/components/organisms/Nav';
import { HOME_DESCRIPTION_TEXT1, HOME_DESCRIPTION_TEXT2 } from '@/constants/textConstants';

interface ResponsiveLayoutProps {
  children: ReactNode;
}

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
          <StyledMobileWrapper>
            {children}
            <StyledNavWrapper>
              <Nav />
            </StyledNavWrapper>
          </StyledMobileWrapper>

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
  width: 3rem;
  height: 3rem;

  @media (max-width: 37.5rem) {
    display: none;
  }
`;

export const StyledMobileWrapper = styled.div`
  position: relative;
  width: 90vw;
  height: 90vh;
  max-width: 30rem;
  max-height: 60rem;
  margin: 0 auto;
  overflow: hidden;

  @media (min-width: 30rem) {
    border: 0.2rem solid ${({ theme }) => theme.themeValues.colorValues.grayscale[600]};
    border-radius: 1rem;
    margin: 1rem 4rem;
  }

  @media (max-width: 37.5rem) {
    width: 100vw;
    height: 100vh;
    max-width: none;
    max-height: none;
  }
`;

const StyledNavWrapper = styled.div`
  z-index: 999;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white;
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
  justify-content: space-around;
  align-items: center;
  ${({ theme }) => {
    const { backgroundPrimary, textPrimary } = theme.currentTheme;
    return `
      background-color: ${backgroundPrimary};
      color: ${textPrimary};
    `;
  }}
`;

const StyledDescriptionArea = styled.article`
  display: none;

  @media (min-width: 30rem) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    text-align: right;
    font-size: 2rem;
    font-weight: bold;
    margin-right: 2rem;

    & div {
      color: ${({ theme }) => theme.currentTheme.textPrimary};
    }
  }
`;
