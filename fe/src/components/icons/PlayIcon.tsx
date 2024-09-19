import React from 'react';
import { useTheme } from 'styled-components';

import { StyledSVG } from '@/styles/styledSVG';

export interface WalkIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  customStyle?: {
    $size?: number;
    $color?: string;
    $stroke?: string;
    $shadow?: string;
    $isCursor?: boolean;
    onClick?: () => void;
  };
}

export default function PlayIcon({
  className,
  customStyle: {
    $size = 53,
    $color = '',
    $stroke = 'none',
    $shadow = 'none',
    $isCursor = true,
    onClick = () => {},
  } = {},
  ...props
}: WalkIconProps) {
  const theme = useTheme();
  const defaultColor = theme.themeValues.colorValues.special.textForce02;

  return (
    <StyledSVG
      className={className}
      viewBox="-2 -2 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={$size + 20}
      height={$size + 20}
      $color={$color || defaultColor}
      $stroke={$stroke}
      $shadow={$shadow}
      $isCursor={$isCursor}
      onClick={onClick}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.5 53C41.1354 53 53 41.1354 53 26.5C53 11.8644 41.1354 0 26.5 0C11.8644 0 0 11.8644 0 26.5C0 41.1354 11.8644 53 26.5 53ZM23.0378 36.6914L35.5463 29.3064C37.6178 28.0831 37.6178 24.9169 35.5463 23.6937L23.0378 16.3086C21.0243 15.1199 18.55 16.6671 18.55 19.1149V33.885C18.55 36.3328 21.0243 37.8802 23.0378 36.6914Z"
      />
    </StyledSVG>
  );
}
