import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import Span from '@/components/atoms/Span';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import { useFeedFormHandlers } from '@/hooks/useFeedFormHandlers';
import { useCreateFeedMutation } from '@/hooks/useFeedQuery';

export default function AddFeed() {
  const navigate = useNavigate();
  const [petId, setPetId] = useState<number>(0);
  const createFeedMutation = useCreateFeedMutation(petId);
  const { formData, formErrors, handleInputChange, handleDateInputChange, handleSubmit } = useFeedFormHandlers(
    petId,
    createFeedMutation,
    navigate
  );

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
      <PageTitleBarWrapper>
        <PageTitleBar route="/menu/feed" title="먹이 기록" />
      </PageTitleBarWrapper>
      <ContentWrapper>
        <Span style={{ margin: '0 0 2rem 0' }}>먹이 기록하기</Span>
        <StyledForm onSubmit={handleSubmit}>
          <FieldWrapper>
            <StyledInput name="amount" value={formData.amount} onChange={handleInputChange} placeholder="양" required />
            {formErrors.amount && <ErrorMessage>{formErrors.amount}</ErrorMessage>}
          </FieldWrapper>
          <FieldWrapper>
            <StyledSelect name="amount_type" value={formData.amount_type} onChange={handleInputChange} required>
              <option value="L">리터 (L)</option>
              <option value="ML">밀리리터 (ML)</option>
              <option value="G">그램 (G)</option>
              <option value="KG">킬로그램 (KG)</option>
            </StyledSelect>
            {formErrors.amount_type && <ErrorMessage>{formErrors.amount_type}</ErrorMessage>}
          </FieldWrapper>
          <FieldWrapper>
            <StyledSelect name="feed_type" value={formData.feed_type} onChange={handleInputChange} required>
              <option value="MEAL">식사 (MEAL)</option>
              <option value="SNACK">간식 (SNACK)</option>
            </StyledSelect>
            {formErrors.feed_type && <ErrorMessage>{formErrors.feed_type}</ErrorMessage>}
          </FieldWrapper>
          <FieldWrapper>
            <StyledInput
              name="date"
              type="datetime-local"
              value={formData.date}
              onChange={handleDateInputChange}
              placeholder="날짜 (YYYY-MM-DD HH:MM)"
              required
            />
            {formErrors.date && <ErrorMessage>{formErrors.date}</ErrorMessage>}
          </FieldWrapper>
          <StyledButton type="submit">먹이 기록 추가</StyledButton>
        </StyledForm>
      </ContentWrapper>
    </Container>
  );
}

// 스타일 적용

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  padding: 1rem;
`;

const PageTitleBarWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 550px;
  padding: 2rem;
  margin-top: 7rem;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: left;
  margin-top: -0.3rem;
  width: 100%;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledInput = styled.input`
  padding: 0.9rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f7f7f7;
  color: #333;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #ff7d29;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(255, 127, 80, 0.5);
  }
`;

const StyledSelect = styled.select`
  padding: 0.9rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f7f7f7;
  color: #333;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #ff7d29;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(255, 127, 80, 0.5);
  }
`;

const StyledButton = styled(Button)`
  padding: 1rem;
  background-color: #ff7d29;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #ff7d29;
    box-shadow: 0 4px 12px rgba(231, 107, 57, 0.3);
  }
`;
