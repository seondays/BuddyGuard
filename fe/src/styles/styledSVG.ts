import styled from 'styled-components';

export const StyledSVG = styled.svg<{ $color: string; $stroke?: string; $shadow?: string; $isCursor?: boolean }>`
  path {
    fill: ${({ $color }) => $color};
    stroke: ${({ $stroke }) => $stroke || 'none'};
    stroke-width: 2;
    cursor: ${({ $isCursor }) => ($isCursor ? 'pointer' : 'auto')};
  }
  filter: ${({ $shadow }) => ($shadow ? `drop-shadow(${$shadow})` : 'none')};
`;
