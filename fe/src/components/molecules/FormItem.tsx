import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import DatePicker from './DatePicker';

const categoryColors: { [key: string]: string } = {
  건강: '#ff9999',
  산책: '#99ccff',
  식사: '#ffcc99',
  체중: '#A6C8DD',
};

interface FormItemProps {
  titleLabel?: string;
  dateLabel?: string;
  timeLabel?: string;
  categoryTitle: string;
  onChange: (data: any) => void;
}

export default function FormItem({
  titleLabel = '제목',
  dateLabel = '날짜',
  timeLabel = '시간',
  categoryTitle,
  onChange,
}: FormItemProps) {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryTitle);
  const [title, setTitle] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDateTimeChange = (date: Date | null) => {
    setSelectedDateTime(date);
    updateFormData({ date });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    updateFormData({ category });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateFormData({ title: e.target.value });
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
    updateFormData({ note: e.target.value });
  };

  const updateFormData = (updatedData: any) => {
    const formData = {
      title,
      note,
      selectedCategory,
      selectedDateTime,
      ...updatedData,
    };
    onChange(formData); // 입력된 모든 데이터를 합쳐서 onChange로 전달
  };

  return (
    <FormContainer>
      <DatePicker
        dateLabel={dateLabel}
        timeLabel={timeLabel}
        value={selectedDateTime}
        onChange={handleDateTimeChange}
      />

      <InputWrapper>
        <StyledLabel>{categoryTitle}</StyledLabel>
        <CategoryButton
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{ backgroundColor: categoryColors[selectedCategory] }}
        >
          {selectedCategory}
        </CategoryButton>
        {isDropdownOpen && (
          <CategoryDropdown>
            {Object.keys(categoryColors).map((category) => (
              <CategoryItem
                key={category}
                onClick={() => handleCategorySelect(category)}
                style={{ backgroundColor: categoryColors[category] }}
              >
                {category}
              </CategoryItem>
            ))}
          </CategoryDropdown>
        )}
      </InputWrapper>

      <Input
        id="title"
        type="text"
        label={titleLabel}
        value={title}
        onChange={handleTitleChange}
        style={{ marginBottom: '0rem' }}
      />
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

const CategoryButton = styled.button`
  background-color: ${({ theme }) => theme.themeValues.colorValues.grayscale[100]};
  padding: 0.5rem 1rem;
  font-size: ${({ theme }) => theme.themeValues.typography.medium};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  flex-grow: 1;
  text-align: center;
`;

const CategoryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  z-index: 10;
`;

const CategoryItem = styled.div`
  padding: 0.75rem;
  font-size: ${({ theme }) => theme.themeValues.typography.medium};
  color: white;
  cursor: pointer;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
`;
