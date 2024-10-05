import { useTheme } from 'styled-components';

import { StyledSVG } from '@/styles/styledSVG';

import { WalkIconProps } from './PlayIcon';

export default function PauseIcon({
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
        d="M26.5 53C41.1354 53 53 41.1354 53 26.5C53 11.8644 41.1354 0 26.5 0C11.8644 0 0 11.8644 0 26.5C0 41.1354 11.8644 53 26.5 53ZM16.1017 17.5359C15.9 18.0229 15.9 18.6403 15.9 19.875V33.125C15.9 34.3596 15.9 34.9771 16.1017 35.4642C16.3707 36.1134 16.8866 36.6294 17.5359 36.8983C18.0229 37.1 18.6403 37.1 19.875 37.1C21.1097 37.1 21.7271 37.1 22.2142 36.8983C22.8634 36.6294 23.3794 36.1134 23.6483 35.4642C23.85 34.9771 23.85 34.3596 23.85 33.125V19.875C23.85 18.6403 23.85 18.0229 23.6483 17.5359C23.3794 16.8866 22.8634 16.3707 22.2142 16.1017C21.7271 15.9 21.1097 15.9 19.875 15.9C18.6403 15.9 18.0229 15.9 17.5359 16.1017C16.8866 16.3707 16.3707 16.8866 16.1017 17.5359ZM29.3517 17.5359C29.15 18.0229 29.15 18.6403 29.15 19.875V33.125C29.15 34.3596 29.15 34.9771 29.3517 35.4642C29.6206 36.1134 30.1366 36.6294 30.7858 36.8983C31.2729 37.1 31.8904 37.1 33.125 37.1C34.3596 37.1 34.9771 37.1 35.4642 36.8983C36.1134 36.6294 36.6294 36.1134 36.8983 35.4642C37.1 34.9771 37.1 34.3596 37.1 33.125V19.875C37.1 18.6403 37.1 18.0229 36.8983 17.5359C36.6294 16.8866 36.1134 16.3707 35.4642 16.1017C34.9771 15.9 34.3596 15.9 33.125 15.9C31.8904 15.9 31.2729 15.9 30.7858 16.1017C30.1366 16.3707 29.6206 16.8866 29.3517 17.5359Z"
      />
    </StyledSVG>
  );
}
