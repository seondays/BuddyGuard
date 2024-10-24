import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Image from '@/components/atoms/Image';
import Span from '@/components/atoms/Span';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import { useDeletePetMutation } from '@/hooks/usePetAPI';
import { usePetStore } from '@/stores/usePetStore';
import { PetInfo } from '@/types/pet';

export default function MyBuddy() {
  const defaultProfileImage = '/assets/images/mascot.png';
  const { petsInfo, setPetsInfo } = usePetStore();
  const [selectedBuddy, setSelectedBuddy] = useState<PetInfo | null>(null);

  const deletePetMutation = useDeletePetMutation();

  const handleSelectBuddy = (buddy: PetInfo) => {
    setSelectedBuddy(buddy);
  };

  const handleDeleteBuddy = () => {
    if (!selectedBuddy) return;

    deletePetMutation.mutate(selectedBuddy.petId, {
      onSuccess: () => {
        const updatedPets = petsInfo.filter((buddy) => buddy.petId !== selectedBuddy.petId);
        setPetsInfo(updatedPets);

        // selectedBuddy가 삭제된 경우 null로 설정
        if (updatedPets.length === 0 || selectedBuddy.petId === updatedPets[0].petId) {
          setSelectedBuddy(null);
        } else {
          setSelectedBuddy(updatedPets[0]); // 다른 버디가 있으면 첫 번째 버디 선택
        }

        alert('버디가 성공적으로 삭제되었습니다.');
      },
      onError: (error) => {
        console.error('버디 삭제 실패:', error);
        alert('버디 삭제에 실패했습니다. 다시 시도해 주세요.');
      },
    });
  };

  useEffect(() => {
    const storedBuddy = localStorage.getItem('petsStorage');
    if (storedBuddy) {
      try {
        const parsedBuddy = JSON.parse(storedBuddy);
        const selectedBuddyFromStorage = parsedBuddy?.state?.selectedBuddy;

        if (selectedBuddyFromStorage) {
          setSelectedBuddy(selectedBuddyFromStorage);
        } else if (petsInfo.length > 0) {
          setSelectedBuddy(petsInfo[0]);
        }
      } catch (error) {
        console.error('로컬 스토리지에서 데이터를 파싱하는 중 오류가 발생했습니다.', error);
      }
    } else if (petsInfo.length > 0) {
      setSelectedBuddy(petsInfo[0]);
    }
  }, [petsInfo]);

  return (
    <MyBuddyContainer>
      <PageTitleBar route="/MyPage" title="나의 버디" />

      <ProfileWrapper>
        <Image src={defaultProfileImage} alt="프로필 이미지" />
      </ProfileWrapper>

      <InfoSection>
        <InfoContent>
          <Span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FF7D29' }}>
            {selectedBuddy ? selectedBuddy.petName + ' - ' : '버디가 없습니다.'}
          </Span>
          <Span style={{ fontSize: '1rem', color: '#FF7D29' }}>{selectedBuddy ? '품종 정보' : ''}</Span>
        </InfoContent>
      </InfoSection>

      <PetDetails>
        <Span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', display: 'block' }}>
          나의 버디 정보
        </Span>
        <div>
          {/* TODO: 버디 연동 */}
          <DetailItem>생일 : 2024년 4월 25일</DetailItem>
          <DetailItem>몸무게 : 3.5kg</DetailItem>
        </div>
      </PetDetails>

      <BuddyList>
        <Span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>나의 버디들</Span>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {petsInfo.map((buddy) => (
            <BuddyButton
              key={buddy.petId}
              onClick={() => handleSelectBuddy(buddy)}
              selected={selectedBuddy?.petId === buddy.petId || false}
            >
              {buddy.petName}
            </BuddyButton>
          ))}
        </div>
        {selectedBuddy && <DeleteButton onClick={handleDeleteBuddy}>{selectedBuddy.petName} 삭제하기</DeleteButton>}
      </BuddyList>
    </MyBuddyContainer>
  );
}

const MyBuddyContainer = styled.div`
  padding: 1rem;
  height: 100vh;
  background-color: #f9f9f9;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  img {
    padding: 1rem;
    width: 50%;
    border-radius: 30%;
    object-fit: cover;
    border: 5px solid #ff7d29;
  }
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const InfoContent = styled.div`
  text-align: center;
`;

const PetDetails = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const DetailItem = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.8rem;
`;

const BuddyList = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

const BuddyButton = styled.button<{ selected: boolean }>`
  padding: 0.8rem 1.5rem;
  background-color: ${(props) => (props.selected ? '#FF7D29' : '#E0E0E0')};
  color: ${(props) => (props.selected ? '#fff' : '#333')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 0.5rem 0.5rem 0 0;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) => (props.selected ? '#FF7D29' : '#ccc')};
  }
`;

const DeleteButton = styled.button`
  padding: 1rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background-color: darkred;
  }
`;
