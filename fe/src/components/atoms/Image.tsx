import styled from 'styled-components';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  borderRadius?: string;
  boxShadow?: boolean;
  isClicked?: boolean;
  src: string;
}
export default function Image({
  width = '100%',
  height = 'auto',
  borderRadius = '0',
  boxShadow = false,
  isClicked = false,
  src,
  ...rest
}: ImageProps) {
  return (
    <StyledImage
      width={width}
      height={height}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      isClicked={isClicked}
      src={src}
      {...rest}
    />
  );
}

const StyledImage = styled.img<ImageProps & { isClicked: boolean }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  background: transparent;
  cursor: pointer;

  // 클릭 상태와 박스 쉐도우 여부에 따라 스타일 동적 적용
  box-shadow: ${({ isClicked, boxShadow }) => (isClicked || boxShadow ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : 'none')};
  transform: ${({ isClicked }) => (isClicked ? 'scale(1.05)' : 'none')};

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
