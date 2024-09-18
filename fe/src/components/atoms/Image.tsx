import styled from 'styled-components';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  $borderRadius?: string;
  $boxShadow?: boolean;
  $isClicked?: boolean;
  src: string;
}

export default function Image({
  $borderRadius = '0',
  $boxShadow = false,
  $isClicked = false,
  src,
  style,
  ...rest
}: ImageProps) {
  return (
    <StyledImage
      $borderRadius={$borderRadius}
      $boxShadow={$boxShadow}
      $isClicked={$isClicked}
      src={src}
      style={style}
      {...rest}
    />
  );
}

const StyledImage = styled.img<ImageProps & { $isClicked: boolean }>`
  width: ${({ style }) => style?.width || '100%'};
  height: ${({ style }) => style?.height || 'auto'};
  border-radius: ${({ $borderRadius }) => $borderRadius};
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
