import React from 'react';
import styled from 'styled-components';

export interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  display?: string;
  width?: string;
  height?: string;
  justifyContent?: string;
  alignItems?: string;
  position?: string;
  bottom?: string;
}

export default function Div({
  backgroundColor,
  padding,
  margin,
  borderRadius,
  display,
  width,
  height,
  justifyContent,
  alignItems,
  position,
  bottom,
  ...rest
}: DivProps) {
  return (
    <StyledDiv
      backgroundColor={backgroundColor}
      padding={padding}
      margin={margin}
      borderRadius={borderRadius}
      display={display}
      width={width}
      height={height}
      justifyContent={justifyContent}
      alignItems={alignItems}
      position={position}
      bottom={bottom}
      {...rest}
    />
  );
}

const StyledDiv = styled.div<DivProps>`
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  display: ${({ display }) => display || 'block'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'stretch'};
  position: ${({ position }) => position || 'static'};
  bottom: ${({ bottom }) => bottom || 'auto'};
`;
