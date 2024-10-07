import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '@/components/atoms/Input';
import DatePicker from '@/components/molecules/DatePicker';

interface FormItemProps {
  titleLabel?: string;
  timeLabel?: string;
  categoryTitle: string;
  onChange: (data: any) => void;
}

export default function FormItem({ titleLabel = '제목', categoryTitle, onChange }: FormItemProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryTitle);
  const [title, setTitle] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
    updateFormData({ note: e.target.value });
  };

  const updateFormData = (updatedData: any) => {
    const formData = {
      title,
      note,
      selectedCategory,
      ...updatedData,
    };
    onChange(formData); // 입력된 모든 데이터를 합쳐서 onChange로 전달
  };

  return (
    <FormContainer>
      <InputWrapper>
        <StyledLabel>{categoryTitle}</StyledLabel>
      </InputWrapper>

      <Input
        id="note"
        type="text"
        label="노트"
        value={note}
        onChange={handleNoteChange}
        style={{ marginBottom: '0rem' }}
      />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding: 0.3rem 1rem;
  width: 100%;
`;

const StyledLabel = styled.label`
  margin-right: 0.5rem;
  min-width: 4rem;
  font-size: ${({ theme }) => theme.themeValues.typography.medium};
  color: ${({ theme }) => theme.currentTheme.textSecondary};
`;
