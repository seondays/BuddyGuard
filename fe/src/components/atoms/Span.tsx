import styled, { useTheme } from 'styled-components';

export interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  $color?: string;
}

export default function Span({ $color, children, ...rest }: SpanProps) {
  const theme = useTheme();
  const defaultColor = `${theme.themeValues.colorValues.grayscale[800]}`;
  return (
    <StyledSpan $color={$color || defaultColor} {...rest}>
      {children}
    </StyledSpan>
  );
}

const StyledSpan = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
`;
