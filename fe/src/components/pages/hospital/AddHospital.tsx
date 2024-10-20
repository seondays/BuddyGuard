import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import { useHospitalFormHandlers } from '@/hooks/useHospitalFormHandlers';
import { useCreateHospitalRecordMutation } from '@/hooks/useHospitalQuery';

export default function AddHospital() {
  const navigate = useNavigate();
  const { formData, errors, handleInputChange, handleDateInputChange, validateAndSubmit } = useHospitalFormHandlers();
  const [petId, setPetId] = useState<number>(0);
  const createHospitalMutation = useCreateHospitalRecordMutation(petId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAndSubmit((formDataToSubmit) => {
      createHospitalMutation.mutate(formDataToSubmit, {
        onSuccess: () => {
          alert('건강 기록 등록 성공!');
          navigate('/menu/hospital');
        },
        onError: (error) => {
          console.error('건강 기록 등록 실패:', error);
          alert('건강 기록 등록에 실패했습니다. 다시 시도해 주세요.');
        },
      });
    });
  };
  useEffect(() => {
    const petsStorage = localStorage.getItem('petsStorage');
    if (petsStorage) {
      const parsedPets = JSON.parse(petsStorage);
      const selectedPetId = parsedPets?.state?.selectedBuddy?.petId;
      setPetId(selectedPetId);
    }
  }, []);
  return (
    <Container>
      <PageTitleBar route="/menu/hospital" title="건강 기록 등록" />
      <FormTitle>새로운 건강 기록</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FieldWrapper>
          <StyledInput name="title" value={formData.title} onChange={handleInputChange} placeholder="제목" required />
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
        </FieldWrapper>
        <FieldWrapper>
          <StyledInput
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="메모"
            required
          />
          {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        </FieldWrapper>
        <FieldWrapper>
          <StyledInput
            name="date"
            value={formData.date}
            onChange={handleDateInputChange}
            placeholder="날짜 (YYYY-MM-DD)"
            required
          />
          {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
        </FieldWrapper>
        <StyledButton type="submit">건강 기록 추가</StyledButton>
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
