import styled from 'styled-components';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  $borderRadius?: string;
  $boxShadow?: boolean;
  $isClicked?: boolean;
  src: string;
  topText?: string;
  bottomText?: string;
  leftText?: string;
  rightText?: string;
}

export default function Image({
  width = '100%',
  height = 'auto',
  $borderRadius = '0',
  $boxShadow = false,
  $isClicked = false,
  src,
  topText,
  bottomText,
  leftText,
  rightText,
  ...rest
}: ImageProps) {
  return (
    <StyledImageWrapper>
      {topText && <StyledText position="top">{topText}</StyledText>}
      <StyledImage
        width={width}
        height={height}
        $borderRadius={$borderRadius}
        $boxShadow={$boxShadow}
        $isClicked={$isClicked}
        src={src}
        {...rest}
      />
      {bottomText && <StyledText position="bottom">{bottomText}</StyledText>}
      {leftText && <StyledText position="left">{leftText}</StyledText>}
      {rightText && <StyledText position="right">{rightText}</StyledText>}
    </StyledImageWrapper>
  );
}

const StyledImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.span<{ position: 'top' | 'bottom' | 'left' | 'right' }>`
  position: absolute;
  ${({ position }) => position}: 0;
  font-size: 1.2rem;
  padding: 0.5rem;
  z-index: 1;
`;

const StyledImage = styled.img<ImageProps & { $isClicked: boolean }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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
