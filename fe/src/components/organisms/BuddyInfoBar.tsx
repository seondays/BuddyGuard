import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Image from '../atoms/Image';
import Span from '../atoms/Span';

export default function BuddyInfoBar() {
  const location = useLocation();

  const isHome = location.pathname === '/';

  const handleChangeBuddy = () => {};
  return (
    <StyledBarWrapper onClick={handleChangeBuddy}>
      <div id="top-info" style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src="/assets/icons/defaultBuddy.png"
          style={{ width: '2.2rem', borderRadius: '50%', marginRight: '1rem', border: '0.2rem solid white' }}
        />
        <Span>버디 이름</Span>
      </div>

      {isHome && (
        <div id="bottom-info" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
          <Span>미해결</Span>
          <Span>일정</Span>
          <Span>건강</Span>
          <Span>체중</Span>
          <Span>산책</Span>
          <Span>식사량</Span>
        </div>
      )}
    </StyledBarWrapper>
  );
}

const StyledBarWrapper = styled.div`
  margin: 1rem 0rem;
  padding: 0.6rem 1rem;
  background-color: ${({ theme }) => theme.themeValues.colorValues.special.modalBg};
  border-radius: 1rem;
`;
