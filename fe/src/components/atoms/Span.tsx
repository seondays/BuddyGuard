import styled from 'styled-components';

export interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  margin?: string;
  padding?: string;
}

export default function Span({
  color = 'black',
  fontSize = '2rem',
  fontWeight = 'normal',
  textAlign = 'left',
  textTransform = 'none',
  margin = '0',
  padding = '0',
  children,
  ...rest
}: SpanProps) {
  return (
    <StyledSpan
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      textTransform={textTransform}
      margin={margin}
      padding={padding}
      {...rest}
    >
      {children}
    </StyledSpan>
  );
}

const StyledSpan = styled.span<SpanProps>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-align: ${({ textAlign }) => textAlign};
  text-transform: ${({ textTransform }) => textTransform};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;
