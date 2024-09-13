import React from 'react';
import styled from 'styled-components';

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ size = 13, color = 'white', ...props }) => {
  return (
    <StyledSVG
      width={size}
      height={size}
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      $color={color}
      {...props}
    >
      <path d="M1.6875 5.875L4.75 8.9375L11.75 1.9375" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </StyledSVG>
  );
};

const StyledSVG = styled.svg<{ $color: string }>`
  stroke: ${({ $color }) => $color};
`;

export default CheckIcon;
