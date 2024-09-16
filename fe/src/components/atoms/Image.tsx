import styled from 'styled-components';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  $borderRadius?: string;
  $boxShadow?: boolean;
  $isClicked?: boolean;
  src: string;
  text?: string;
  textPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Image({
  $borderRadius = '0',
  $boxShadow = false,
  $isClicked = false,
  src,
  text,
  textPosition,
  style,
  ...rest
}: ImageProps) {
  return (
    <StyledImageContainer>
      {text && textPosition === 'top' && (
        <StyledText style={{ fontSize: style?.fontSize, fontWeight: style?.fontWeight }}>{text}</StyledText>
      )}
      <StyledImage
        $borderRadius={$borderRadius}
        $boxShadow={$boxShadow}
        $isClicked={$isClicked}
        src={src}
        style={style}
        {...rest}
      />
      {text && textPosition === 'bottom' && (
        <StyledText style={{ fontSize: style?.fontSize, fontWeight: style?.fontWeight }}>{text}</StyledText>
      )}
      {text && textPosition === 'left' && (
        <StyledText style={{ fontSize: style?.fontSize, fontWeight: style?.fontWeight }} position="left">
          {text}
        </StyledText>
      )}
      {text && textPosition === 'right' && (
        <StyledText style={{ fontSize: style?.fontSize, fontWeight: style?.fontWeight }} position="right">
          {text}
        </StyledText>
      )}
    </StyledImageContainer>
  );
}

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledText = styled.span<{ position?: 'left' | 'right' }>`
  margin-top: ${({ position }) => (position ? '0' : '0.5rem')};
  margin-left: ${({ position }) => (position === 'left' ? '0.5rem' : '0')};
  margin-right: ${({ position }) => (position === 'right' ? '0.5rem' : '0')};
  position: ${({ position }) => (position ? 'absolute' : 'static')};
  left: ${({ position }) => (position === 'left' ? '-1.5rem' : 'auto')};
  right: ${({ position }) => (position === 'right' ? '-1.5rem' : 'auto')};
  top: ${({ position }) => (position ? '50%' : 'auto')};
  transform: ${({ position }) => (position ? 'translateY(-50%)' : 'none')};
  white-space: nowrap;
`;

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
