import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { flexRow } from '@/styles/layoutStyles';
import Paw from '@/svg/paw.svg';

import Image from '../atoms/Image';

interface MyPageItemProps {
  title: string;
  router?: string;
  onClick?: () => void;
}

export default function MyPageItem({ title, router, onClick }: MyPageItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (router) {
      navigate(router);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        borderBottom: '1px solid #ddd',
        margin: '0.1rem 0',
        cursor: 'pointer',
      }}
    >
      <StyledTextWrapper>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <StyledIcon />
          <StyledText>{title}</StyledText>
        </div>
        <Image src="/assets/icons/arrow_right.png" style={{ width: '0.5rem' }} />
      </StyledTextWrapper>
    </div>
  );
}

const StyledTextWrapper = styled.div`
  padding: 0 1.5rem;
  ${flexRow}
  justify-content: space-between;
`;
const StyledIcon = styled(Paw)`
  width: 1.5rem;
  fill: ${({ theme }) => theme.currentTheme.textAccentSecondary};
`;

const StyledText = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
`;
