import React, { useState } from 'react';
import styled from 'styled-components';
import { z } from 'zod';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import { useCreatePetMutation } from '@/hooks/usePetAPI';
import { petSchema } from '@/schema/formSchema';
import { PetData } from '@/types/pet';

export default function AddBuddy() {
  const [formData, setFormData] = useState<PetData>({
    name: '',
    type: '',
    birth: '',
    profile_image: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const createPetMutation = useCreatePetMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleProfileImageClick = () => {
    document.getElementById('profile-image-input')?.click();
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let cleanedValue = value.replace(/[^0-9]/g, '');

    if (cleanedValue.length >= 5 && cleanedValue.length <= 6) {
      cleanedValue = `${cleanedValue.slice(0, 4)}-${cleanedValue.slice(4)}`;
    } else if (cleanedValue.length >= 7) {
      cleanedValue = `${cleanedValue.slice(0, 4)}-${cleanedValue.slice(4, 6)}-${cleanedValue.slice(6, 8)}`;
    }

    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      petSchema.parse(formData);
      setErrors({});

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('type', formData.type);
      formDataToSubmit.append('birth', formData.birth);
      if (file) {
        formDataToSubmit.append('profile_image', file);
      }

      createPetMutation.mutate(formDataToSubmit, {
        onSuccess: () => {
          console.log('버디 추가 완료');
        },
        onError: (error) => {
          console.error('버디 추가 실패:', error);
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
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
          <StyledInput placeholder="프로필 이미지를 선택해주세요" onClick={handleProfileImageClick} readOnly />
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

const StyledInput = styled(Input)`
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  &:focus {
    outline: none;
    border-color: orange;
  }
  cursor: pointer;
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
