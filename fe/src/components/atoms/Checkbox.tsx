import { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

import CheckIcon from '@public/assets/icons/CheckIcon.svg';

type checkboxSizeType = 'small' | 'medium' | 'large';

type CheckboxSizeMap = {
  [key in checkboxSizeType]: string;
};

const checkboxSize: CheckboxSizeMap = {
  small: '1.25rem',
  medium: '1.5rem',
  large: '2rem',
};

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checkboxSize?: checkboxSizeType;
  label?: string;
  isChecked?: boolean;
}

export default function Checkbox({ checkboxSize = 'small', label = '테스트', isChecked = false }: CheckboxProps) {
  const [checked, setChecked] = useState(isChecked);

  const handleCheckboxChange = () => setChecked((prevChecked) => !prevChecked);

  return (
    <CheckboxContainer>
      <HiddenCheckbox id="chk" checked={checked} onChange={handleCheckboxChange} />
      <StyledCheckbox htmlFor="chk" checked={checked} $size={checkboxSize} />
      <CheckboxLabel htmlFor="chk">{label}</CheckboxLabel>
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none; /* 체크박스 숨기기 */
`;

const StyledCheckbox = styled.label<{ checked: boolean; $size: checkboxSizeType }>`
  width: ${({ $size }) => checkboxSize[$size]};
  height: ${({ $size }) => checkboxSize[$size]};
  border: ${({ theme }) => `0.1rem solid ${theme.colorValues.grayscale[200]}`};
  display: inline-block;
  cursor: pointer;
  border-radius: ${({ $size, theme }) => theme.radius[$size]};
  user-select: none; /* 드래그 금지 */
  background: ${({ checked, theme }) => (checked ? theme.colorValues.special.textForce : 'transparent')};

  &::after {
    content: ${({ checked }) => (checked ? CheckIcon : '""')};
    color: white; // 선택된 아이콘 색상
    font-size: ${({ $size }) => checkboxSize[$size]};
  }
`;

const CheckboxLabel = styled.label`
  font-size: 30px;
  position: relative;
  top: 6px;
  letter-spacing: -5px;
  cursor: pointer;
  user-select: none;
`;
