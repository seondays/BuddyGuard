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
  const [selectedBuddy, setSelectedBuddy] = useState(petsInfo[0]);

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

        if (updatedPets.length > 0) {
          setSelectedBuddy(updatedPets[0]);
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
    if (petsInfo.length > 0 && !selectedBuddy) {
      setSelectedBuddy(petsInfo[0]);
    }
  }, [petsInfo, selectedBuddy]);

  return (
    <MyBuddyContainer>
      <PageTitleBar route="/MyPage" title="나의 버디" />

      <ProfileWrapper>
        <Image src={defaultProfileImage} style={{ width: '80%' }} alt="프로필 이미지" />
      </ProfileWrapper>

      <InfoSection>
        <InfoContent>
          <Span style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '0.5rem 0', color: 'orange' }}>
            {selectedBuddy ? selectedBuddy.petName : '버디가 없습니다.'}
          </Span>
          <Span style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '0.5rem 0' }}>
            {selectedBuddy ? '품종' : ''}
          </Span>
        </InfoContent>
        <Image src={defaultProfileImage} style={{ width: '5rem', marginRight: '1rem' }} alt="프로필 이미지" />
      </InfoSection>

      <PetDetails>
        <Span style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '0.5rem', marginBottom: '1rem' }}>
          나의 버디 정보
        </Span>
        <div>
          <Span style={{ fontSize: '1.3rem', fontWeight: 'bold', padding: '0.5rem' }}>생일</Span>
          <Span style={{ fontSize: '1.3rem', fontWeight: 'bold', padding: '0.5rem' }}>몸무게</Span>
          <Span style={{ fontSize: '1.3rem', fontWeight: 'bold', padding: '0.5rem' }}>등등...</Span>
        </div>
      </PetDetails>

      <BuddyList>
        <Span style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '0.5rem' }}>나의 버디들</Span>
        <div>
          {petsInfo.map((buddy) => (
            <BuddyButton
              key={buddy.petId}
              onClick={() => handleSelectBuddy(buddy)}
              selected={selectedBuddy && selectedBuddy.petId === buddy.petId}
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
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 1rem;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PetDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const BuddyList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const BuddyButton = styled.button<{ selected: boolean }>`
  padding: 1rem;
  margin-right: 1rem;
  background-color: ${(props) => (props.selected ? 'orange' : 'lightgray')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 1rem;
  background-color: red;
  color: white;
  /* font-size: 1.2rem; */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: darkred;
  }
`;
