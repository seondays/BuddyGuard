import { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';
import Nav from '@/components/organism/Nav';
import { HOME_DESCRIPTION_TEXT1, HOME_DESCRIPTION_TEXT2 } from '@/constants/textConstants';

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const { toggleDarkMode } = useTheme();

  return (
    <StyledScreenWrapper>
      <StyledDescriptionArea>
        <div>{HOME_DESCRIPTION_TEXT1}</div>
        <div>{HOME_DESCRIPTION_TEXT2}</div>
      </StyledDescriptionArea>
      <StyledMobileWrapper>
        {children}
        <StyledNavWrapper>
          <Nav />
        </StyledNavWrapper>
      </StyledMobileWrapper>
    </StyledScreenWrapper>
  );
}

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
  display: none; /* 기본적으로 숨김 */

  @media (min-width: 481px) {
    /* 481px 이상일 때만 보이도록 */
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align
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

const StyledMobileWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 480px; /* 최대 너비 */
  max-height: 960px; /* 최대 높이 */
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  @media (min-width: 481px) {
    margin: 1rem 4rem;
    border: 0.2rem solid black;
  }
`;

const StyledNavWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white;
`;
