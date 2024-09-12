import styled from 'styled-components';
import theme from '@/styles/theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  bgColor?: string;
  border?: string;
  fontSize?: string;
  display?: string;
  textAlign?: string;
  justifyContent?: string;
  alignItems?: string;
  isClicked?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({
  children,
  width = '100%',
  height = '4rem',
  bgColor = 'white',
  border = `${theme.colorValues.special.textForce02} solid 0.1rem`,
  display = 'flex',
  fontSize = '1rem',
  textAlign = 'center',
  justifyContent = 'center',
  alignItems = 'center',
  isClicked = false,
  onClick,
  ...rest
}: ButtonProps) => (
  <StyledButton
    width={width}
    height={height}
    bgColor={bgColor}
    border={border}
    display={display}
    fontSize={fontSize}
    textAlign={textAlign}
    alignItems={alignItems}
    isClicked={isClicked}
    onClick={onClick}
    {...rest}
  >
    {children}
  </StyledButton>
);

const getButtonStyle = (isClicked: boolean, bgColor: string | undefined) => ({
  backgroundColor: isClicked ? theme.colorValues.special.modalBg : bgColor,
  boxShadow: isClicked ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
  transform: isClicked ? 'translateY(-2px)' : 'none',
});

const StyledButton = styled.button<ButtonProps & { isClicked: boolean }>`
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  text-align: ${({ textAlign }) => textAlign};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ isClicked, bgColor }) => getButtonStyle(isClicked, bgColor)};  
  border: ${({ border }) => border};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color = theme.colorValues.grayscale[900] }) => color};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover, &:focus {
    background-color: ${theme.colorValues.special.modalBg};
  }
`;

export default Button;