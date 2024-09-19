import { useTheme } from 'styled-components';

import { StyledSVG } from '@/styles/styledSVG';

import { WalkIconProps } from './PlayIcon';

export default function StopIcon({
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
        d="M26.5 53C41.1354 53 53 41.1354 53 26.5C53 11.8644 41.1354 0 26.5 0C11.8644 0 0 11.8644 0 26.5C0 41.1354 11.8644 53 26.5 53ZM17.4523 17.4523C15.9 19.0047 15.9 21.5032 15.9 26.5C15.9 31.4968 15.9 33.9953 17.4523 35.5476C19.0047 37.1 21.5032 37.1 26.5 37.1C31.4968 37.1 33.9953 37.1 35.5476 35.5476C37.1 33.9953 37.1 31.4968 37.1 26.5C37.1 21.5032 37.1 19.0047 35.5476 17.4523C33.9953 15.9 31.4968 15.9 26.5 15.9C21.5032 15.9 19.0047 15.9 17.4523 17.4523Z"
      />
    </StyledSVG>
  );
}
