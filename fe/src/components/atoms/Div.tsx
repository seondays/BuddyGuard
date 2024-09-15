import React from 'react';
import styled from 'styled-components';

export interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
}

export default function Div({ style, ...rest }: DivProps) {
  return <StyledDiv style={style} {...rest} />;
}

const StyledDiv = styled.div``;
