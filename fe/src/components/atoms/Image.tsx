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
  text,
  textPosition,
  $isTextHidden = true,
  style,
  ...rest
}: ImageProps) {
  const commonStyle = { fontSize: style?.fontSize, fontWeight: style?.fontWeight, color: style?.color };
  return (
    <StyledImageContainer className={className}>
      {text && textPosition === 'top' && (
        <StyledText style={commonStyle} $isTextHidden={$isTextHidden}>
          {text}
        </StyledText>
      )}

      <StyledImage {...{ $borderRadius, $boxShadow, $isClicked, src, style, ...rest }} />

      {text && textPosition === 'bottom' && (
        <StyledText $isTextHidden={$isTextHidden} style={commonStyle}>
          {text}
        </StyledText>
      )}
      {text && textPosition === 'left' && (
        <StyledText style={commonStyle} position={textPosition} $isTextHidden={$isTextHidden}>
          {text}
        </StyledText>
      )}
      {text && textPosition === 'right' && (
        <StyledText style={commonStyle} position={textPosition} $isTextHidden={$isTextHidden}>
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

const StyledText = styled.span<{ position?: 'left' | 'right'; $isTextHidden: boolean }>`
  margin-top: ${({ position }) => (position ? '0' : '0.5rem')};
  margin-left: ${({ position }) => (position === 'left' ? '0.5rem' : '0')};
  margin-right: ${({ position }) => (position === 'right' ? '0.5rem' : '0')};
  position: ${({ position }) => (position ? 'absolute' : 'static')};
  left: ${({ position }) => (position === 'left' ? '-1.5rem' : 'auto')};
  right: ${({ position }) => (position === 'right' ? '-1.5rem' : 'auto')};
  top: ${({ position }) => (position ? '50%' : 'auto')};
  transform: ${({ position }) => (position ? 'translateY(-50%)' : 'none')};
  color: ${({ style }) => style?.color || 'red'};
  white-space: nowrap;

  ${({ $isTextHidden }) =>
    $isTextHidden &&
    `width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;`};
`;

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
