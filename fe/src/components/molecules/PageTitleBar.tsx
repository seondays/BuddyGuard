import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import Span from '@/components/atoms/Span';
import arrow_back from '@/svg/arrow_back.svg';

type props = {
  title: string;
  route?: string;
};
export default function PageTitleBar({ title, route }: props) {
  const titleColor = useTheme().currentTheme.textPrimary;
  const navigate = useNavigate();

  const handleClick = () => navigate(`${route ? route : '/menu'}`);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', padding: '1rem' }}>
      <div onClick={handleClick}>
        <StyledArrowBack />
      </div>
      <Span $color={titleColor} style={{ margin: '0 auto', fontSize: '1.5rem', fontWeight: 'bold' }}>
        {title}
      </Span>
    </div>
  );
}

const StyledArrowBack = styled(arrow_back)`
  position: absolute;
  left: 0;
  width: 2rem;
  cursor: pointer;

  & path {
    stroke: ${({ theme }) => theme.currentTheme.textSecondary};
  }
`;
