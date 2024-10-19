import React from 'react';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import { useBuddyFormHandlers } from '@/hooks/useBuddyFormHandlers';
import { useCreatePetMutation } from '@/hooks/usePetAPI';

export default function AddBuddy() {
  const {
    formData,
    file,
    errors,
    handleInputChange,
    handleDateInputChange,
    handleFileChange,
    handleProfileImageClick,
    validateAndSubmit,
  } = useBuddyFormHandlers();
  const createPetMutation = useCreatePetMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAndSubmit((formDataToSubmit) => {
      createPetMutation.mutate(formDataToSubmit, {
        onSuccess: () => {
          console.log('버디 추가 완료');
        },
        onError: (error) => {
          console.error('버디 추가 실패:', error);
        },
      });
    });
  };

  return (
    <Container>
      <PageTitleBar route="/MyPage" title="내 정보" />
      <FormTitle>새로운 버디 추가</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FieldWrapper>
          <StyledInput
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="버디 이름"
            required
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FieldWrapper>
        <FieldWrapper>
          <StyledInput
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="품종 (개, 고양이 등)"
            required
          />
          {errors.type && <ErrorMessage>{errors.type}</ErrorMessage>}
        </FieldWrapper>
        <FieldWrapper>
          <StyledInput
            name="birth"
            value={formData.birth}
            onChange={handleDateInputChange}
            placeholder="생일 (YYYY-MM-DD)"
            required
          />
          {errors.birth && <ErrorMessage>{errors.birth}</ErrorMessage>}
        </FieldWrapper>
        <FieldWrapper>
          <StyledInput placeholder="프로필 이미지" onClick={handleProfileImageClick} readOnly />
          <HiddenFileInput id="profile-image-input" type="file" accept="image/*" onChange={handleFileChange} />
          {file && <ImagePreview src={URL.createObjectURL(file)} alt="선택된 이미지 미리보기" />}
        </FieldWrapper>

        <StyledButton type="submit">버디 추가</StyledButton>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.9rem;
`;

const FieldWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 50%;
`;

const HiddenFileInput = styled.input`
  visibility: hidden;
  height: 0;
  width: 0;
`;

const StyledInput = styled.input`
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  &:focus {
    outline: none;
    border-color: orange;
  }
`;

const StyledButton = styled(Button)`
  padding: 1rem;
  margin-top: 1rem;
  background-color: orange;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  &:hover {
    background-color: darkorange;
  }
`;
