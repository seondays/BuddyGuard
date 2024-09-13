import styled, { DefaultTheme, useTheme } from 'styled-components';

interface ButtonStyleProps {
  $isClicked: boolean;
  $boxShadow: string | undefined;
  $bgColor: string | undefined;
  theme: DefaultTheme;
}

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
  $boxShadow?: string;
  $borderRadius?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  children,
  width = '100%',
  height = '4rem',
  $bgColor = 'white',
  $border,
  $borderRadius,
  display = 'flex',
  fontSize = '1rem',
  $textAlign = 'center',
  $justifyContent = 'center',
  $alignItems = 'center',
  $isClicked = false,
  $boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.2)',
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
      $borderRadius={$borderRadius}
      display={display}
      fontSize={fontSize}
      $textAlign={$textAlign}
      $justifyContent={$justifyContent}
      $alignItems={$alignItems}
      $isClicked={$isClicked}
      $boxShadow={$boxShadow}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

const getButtonStyle = ({ $isClicked, $boxShadow, $bgColor, theme }: ButtonStyleProps) => ({
  backgroundColor: $isClicked ? theme.themeValues.colorValues.special.modalBg : $bgColor,
  boxShadow: $isClicked ? $boxShadow : 'none',
  transform: $isClicked ? 'translateY(-2px)' : 'none',
});

const StyledButton = styled.button<ButtonProps & { $isClicked: boolean }>`
  display: ${({ display }) => display};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  text-align: ${({ $textAlign }) => $textAlign};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ $isClicked, $boxShadow, $bgColor, theme }) => getButtonStyle({ $isClicked, $boxShadow, $bgColor, theme })};
  $border: ${({ $border }) => $border};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color, theme }) => color || theme.themeValues.colorValues.grayscale[900]};
  ${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius}`};

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.themeValues.colorValues.special.modalBg};
  }
`;
