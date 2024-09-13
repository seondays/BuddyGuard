import styled, { DefaultTheme, useTheme } from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  $bgColor?: string;
  $border?: string;
  fontSize?: string;
  display?: string;
  $textAlign?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $isClicked?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  children,
  width = '100%',
  height = '4rem',
  $bgColor = 'white',
  $border,
  display = 'flex',
  fontSize = '1rem',
  $textAlign = 'center',
  $justifyContent = 'center',
  $alignItems = 'center',
  $isClicked = false,
  onClick,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const defaultBorder = `${theme.themeValues.colorValues.special.textForce02} solid 0.1rem`;

  return (
    <StyledButton
      width={width}
      height={height}
      $bgColor={$bgColor}
      $border={$border || defaultBorder}
      display={display}
      fontSize={fontSize}
      $textAlign={$textAlign}
      $justifyContent={$justifyContent}
      $alignItems={$alignItems}
      $isClicked={$isClicked}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

const getButtonStyle = ($isClicked: boolean, $bgColor: string | undefined, theme: DefaultTheme) => ({
  backgroundColor: $isClicked ? theme.themeValues.colorValues.special.modalBg : $bgColor,
  boxShadow: $isClicked ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
  transform: $isClicked ? 'translateY(-2px)' : 'none',
});

const StyledButton = styled.button<ButtonProps & { $isClicked: boolean }>`
  display: ${({ display }) => display};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  text-align: ${({ $textAlign }) => $textAlign};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ $isClicked, $bgColor, theme }) => getButtonStyle($isClicked, $bgColor, theme)};
  $border: ${({ $border }) => $border};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color, theme }) => color || theme.themeValues.colorValues.grayscale[900]};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.themeValues.colorValues.special.modalBg};
  }
`;
