import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import theme from '@/styles/theme';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  $placeholder: string;
  widthPercent?: number;
  isBottomLine: boolean;
}

export default function Input({
  label,
  $placeholder = '',
  widthPercent = 100,
  isBottomLine = true,
  ...rest
}: InputProps) {
  return (
    <InputWrapper widthPercent={widthPercent} isBottomLine={isBottomLine}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput placeholder={$placeholder} {...rest} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div<{ widthPercent: number; isBottomLine: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.3rem 1rem;
  width: ${({ widthPercent }) => `${widthPercent}%`};
  position: relative;

  // props를 통해 테마에 접근하여 border-bottom 스타일 설정 : 이건 되는데
  /* border-bottom: 2px solid ${({ theme }) => theme.colorValues.grayscale[100]}; */

  // props를 통해 테마에 접근하여 조건부 ::after 스타일 설정 : 이거 에러남
  ${({ isBottomLine, theme }) =>
    isBottomLine &&
    `
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      left: 0;
      bottom: 0;
      background-color: ${theme.colorValues.grayscale[100]};
    }
   `}
`;

const StyledLabel = styled.label`
  margin-right: 0.5rem;
  min-width: 4rem;
  color: ${theme.lightTheme.textSecondary};
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  /* background-color: red; */
  width: 100%;
  caret-color: ${theme.colorValues.special.textForce};
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  outline: none;

  & focus {
    outline: none;
  }
`;
