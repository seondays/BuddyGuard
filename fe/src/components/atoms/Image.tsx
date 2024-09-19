import styled from 'styled-components';

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, '$borderRadius'> {
  $borderRadius?: string;
  $boxShadow?: boolean;
  $isClicked?: boolean;
  src: string;
  text?: string;
  textPosition?: 'top' | 'bottom' | 'left' | 'right';
  $isTextHidden?: boolean;
}

export default function Image({
  className,
  $borderRadius = 'none',
  $boxShadow = false,
  $isClicked = false,
  src,
  style,
  ...rest
}: ImageProps) {
  return <StyledImage {...{ className, $borderRadius, $boxShadow, $isClicked, src, style, ...rest }} />;
}

const StyledImage = styled.img<ImageProps & { $isClicked: boolean }>`
  ${({ style }) => {
    const { width, height, border, marginTop } = style || {};
    return `
      width: ${width || '100%'};
      height: ${height || 'auto'};
      border: ${border || 'none'};
      margin-top:${marginTop || 'none'};
    `;
  }}

  border-radius: ${({ $borderRadius }) => $borderRadius || '0'};
  background: transparent;
  cursor: pointer;

  box-shadow: ${({ $isClicked, $boxShadow }) =>
    $isClicked || $boxShadow ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : 'none'};
  transform: ${({ $isClicked }) => ($isClicked ? 'scale(1.05)' : 'none')};

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
