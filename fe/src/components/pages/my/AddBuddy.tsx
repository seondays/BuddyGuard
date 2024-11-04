import { message } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import Span from '@/components/atoms/Span';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import { useBuddyFormHandlers } from '@/hooks/useBuddyFormHandlers';
import { useCreatePetMutation } from '@/hooks/usePetAPI';

export default function AddBuddy() {
  const navigate = useNavigate();

  useEffect(() => {
    const petsStorage = localStorage.getItem('petsStorage');
    const petsInfo = petsStorage ? JSON.parse(petsStorage) : [];
    const petsData = petsInfo.state.petsInfo;
    if (petsData.length >= 3) {
      message.warning('버디는 3마리까지만 등록 가능합니다.');
      navigate(-1);
    }
  }, [navigate]);

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
          message.success('버디 등록 성공!');
          navigate('/');
        },
        onError: (error) => {
          console.error('버디 추가 실패:', error);
          message.error('버디 등록에 실패했습니다. 다시 시도해 주세요.');
        },
      });
    });
  };

  return (
    <Container>
      <PageTitleBarWrapper>
        <PageTitleBar route="/MyPage" title="나의 버디" />
      </PageTitleBarWrapper>
      <ContentWrapper>
        <Span style={{ margin: '0 0 2rem 0' }}>새로운 버디 등록</Span>
        <StyledForm onSubmit={handleSubmit}>
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
            {file && typeof file !== 'string' && (
              <ImagePreview src={URL.createObjectURL(file)} alt="선택된 이미지 미리보기" />
            )}
          </FieldWrapper>
          <StyledButton type="submit">버디 추가</StyledButton>
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
  height: 100vh;
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
  background-color: #fff;
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

const HiddenFileInput = styled.input`
  visibility: hidden;
  height: 0;
  width: 0;
`;

const ImagePreview = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  margin-top: 0.8rem;
  border-radius: 50%;
  border: 2px solid #ddd;
`;

const StyledButton = styled(Button)`
  padding: 1rem;
  background-color: #ff7d29;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e76b39;
    box-shadow: 0 4px 12px rgba(231, 107, 57, 0.3);
  }
`;
