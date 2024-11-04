import { InputHTMLAttributes, CSSProperties } from 'react';
import styled from 'styled-components';

type InputSizeType = 'small' | 'medium' | 'large';

const inputTypography: { [key in InputSizeType]: string } = {
  small: '0.7rem', //'11.2px'
  medium: '0.9rem', //'14.4px'
  large: '1.3rem', //'20.8px'
};

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'size'> {
  size?: InputSizeType;
  label?: string;
  placeholder?: string;
  $widthPercent?: number;
  $isBottomLine?: boolean;
  style?: CSSProperties;
}

export default function Input({
  size = 'medium',
  label,
  placeholder = '',
  $widthPercent = 100,
  $isBottomLine = true,
  style,
  ...rest
}: InputProps) {
  return (
    <InputWrapper $widthPercent={$widthPercent} $isBottomLine={$isBottomLine} style={style}>
      {label && <StyledLabel size={size}>{label}</StyledLabel>}
      <StyledInput size={size} placeholder={placeholder} {...rest} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div<{ $widthPercent: number; $isBottomLine: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.3rem 1rem;
  width: ${({ $widthPercent }) => `${$widthPercent}%`};
  position: relative;
  ${({ $isBottomLine, theme }) =>
    $isBottomLine &&
    `
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0;
      bottom: 0;
      background-color: ${theme.themeValues.colorValues.grayscale[100]};
    }
   `}
`;

const StyledLabel = styled.label<{ size: InputSizeType }>`
  margin-right: 0.5rem;
  min-width: 4rem;
  font-size: ${({ theme, size }) => theme.themeValues.typography[size]};
  color: ${({ theme }) => theme.currentTheme.textSecondary};
`;

const StyledInput = styled.input<{ size: InputSizeType }>`
  background-color: transparent;
  width: 100%;
  caret-color: ${({ theme }) => theme.themeValues.colorValues.special.textForce};
  padding: 0.5rem;
  font-size: ${({ size }) => inputTypography[size]};
  border: none;
  outline: none;
  color: ${({ theme }) => theme.currentTheme.textSecondary};
  &:focus {
    outline: none;
  }
`;
