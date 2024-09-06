import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import theme from '@/styles/theme';

const {
  special: { textForce },
} = theme.colorValues;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fullWidth?: boolean;
  hasError?: boolean;
}

export default function Input({ label, fullWidth, hasError, ...rest }: InputProps) {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput hasError={hasError} {...rest} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${theme.lightTheme.textSecondary};
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  caret-color: ${textForce};
  padding: 0.5rem;
  font-size: 1rem;
  ${({ hasError }) =>
    hasError &&
    css`
      background-color: red;
    `}
`;
