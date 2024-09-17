import { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

import CheckIcon from '@/components/icons/CheckIcon';

type CheckboxSizeType = 'small' | 'medium' | 'large';

const checkboxSize: { [key in CheckboxSizeType]: string } = {
  small: '1.25rem',
  medium: '1.5rem',
  large: '2rem',
};

const checkIconSize: { [key in CheckboxSizeType]: number } = {
  small: 13,
  medium: 17,
  large: 25,
};

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: CheckboxSizeType;
  label?: string;
  isChecked?: boolean;
}

export default function Checkbox({ className, size = 'small', label = '', isChecked = false }: CheckboxProps) {
  const [checked, setChecked] = useState(isChecked);

  const handleCheckboxChange = () => setChecked((prevChecked) => !prevChecked);

  return (
    <StyledCheckboxContainer className={className}>
      <StyledCheckboxLabel htmlFor="chk" size={size}>
        {label}
      </StyledCheckboxLabel>
      <StyledHiddenCheckbox id="chk" checked={checked} onChange={handleCheckboxChange} />
      <StyledCheckbox htmlFor="chk" checked={checked} size={size}>
        {checked && <CheckIcon size={checkIconSize[size]} />}
      </StyledCheckbox>
    </StyledCheckboxContainer>
  );
}

const StyledCheckboxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
`;

const StyledCheckboxLabel = styled.label<{ size: CheckboxSizeType }>`
  font-size: ${({ theme, size }) => theme.themeValues.typography[size]};
  margin-right: ${({ theme, size }) => theme.themeValues.spacing[size]};
  cursor: pointer;
  user-select: none;

  margin-right: ${({ theme }) => theme.currentTheme.backgroundPrimary};
`;

const StyledHiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.label<{ checked: boolean; size: CheckboxSizeType }>`
  width: ${({ size }) => checkboxSize[size]};
  height: ${({ size }) => checkboxSize[size]};
  border: ${({ theme }) => `0.1rem solid ${theme.themeValues.colorValues.grayscale[200]}`};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${({ size, theme }) => theme.themeValues.radius[size]};
  user-select: none;
  background: ${({ checked, theme }) =>
    checked ? theme.themeValues.colorValues.special.textForce : theme.themeValues.colorValues.grayscale[50]};
  transition: all 0.2s ease-in-out;

  svg {
    width: 80%;
    height: 80%;
  }
`;
