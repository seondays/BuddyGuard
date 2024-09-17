import React from 'react';
import { useTheme } from 'styled-components';

import { StyledSVG } from '@/styles/styledSVG';

interface PlayIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  customStyle?: {
    $size?: number;
    $color?: string;
    $stroke?: string;
    $shadow?: string;
    $isCursor?: boolean;
  };
}

export default function PlayIcon({
  className,
  customStyle: { $size = 119, $color = '', $stroke = 'none', $shadow = 'none', $isCursor = false } = {},
  ...props
}: PlayIconProps) {
  const theme = useTheme();
  const defaultColor = theme.themeValues.colorValues.special.textForce02;

  return (
    <StyledSVG
      className={className}
      viewBox="0 0 119 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={$size}
      $color={$color || defaultColor}
      $stroke={$stroke}
      $shadow={$shadow}
      $isCursor={$isCursor}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.5 118.25C91.9464 118.25 118.25 91.9464 118.25 59.5C118.25 27.0533 91.9464 0.75 59.5 0.75C27.0533 0.75 0.75 27.0533 0.75 59.5C0.75 91.9464 27.0533 118.25 59.5 118.25ZM51.8243 82.0941L79.5555 65.7216C84.148 63.0097 84.148 55.9903 79.5555 53.2784L51.8243 36.9059C47.3605 34.2705 41.875 37.7006 41.875 43.1273V75.8725C41.875 81.2992 47.3605 84.7296 51.8243 82.0941Z"
      />
    </StyledSVG>
  );
}
