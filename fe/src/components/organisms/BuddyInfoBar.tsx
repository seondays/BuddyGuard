import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Image from '@/components/atoms/Image';
import Span from '@/components/atoms/Span';
import { usePetStore } from '@/stores/usePetStore';

interface PetInfo {
  petId: number;
  petName: string;
}

export default function BuddyInfoBar() {
  const [petInfo, setPetInfo] = useState<PetInfo[]>([]);

  const { petsInfo, selectedBuddy, setSelectedBuddy } = usePetStore();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleBuddyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const buddyId = parseInt(e.target.value, 10);
    const buddy = petsInfo.find((pet) => pet.petId === buddyId);
    if (buddy) {
      setSelectedBuddy(buddy);
    }
  };

  useEffect(() => {
    if (Array.isArray(petsInfo)) {
      setPetInfo(petsInfo as PetInfo[]);
    }
  }, [petsInfo]);

  return (
    <StyledBarWrapper>
      <TopInfo>
        <BuddyInfo>
          <StyledImage src="/assets/images/mascot.png" alt="버디 이미지" />
          <StyledSpan>{selectedBuddy?.petName || '버디를 등록해주세요'}</StyledSpan>
        </BuddyInfo>
        <SelectWrapper>
          <SelectBox value={selectedBuddy?.petId} onChange={handleBuddyChange}>
            {petInfo.map((buddy) => (
              <option key={buddy.petId} value={buddy.petId}>
                {buddy.petName}
              </option>
            ))}
          </SelectBox>
        </SelectWrapper>
      </TopInfo>
      {isHome && (
        <BottomInfo>
          <Span>일정</Span>
          <Span>건강</Span>
          <Span>체중</Span>
          <Span>산책</Span>
          <Span>식사량</Span>
        </BottomInfo>
      )}
    </StyledBarWrapper>
  );
}

const StyledBarWrapper = styled.div`
  margin: 0.5rem 0rem;
  padding: 0.6rem 1rem;
  background-color: #ff7d29;
  border-radius: 1rem;
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BuddyInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 1rem;
  border: 0.2rem solid white;
  background-color: white;
`;

const StyledSpan = styled(Span)`
  font-size: 1.2rem;
  color: white;
`;

const SelectWrapper = styled.div`
  margin-left: 1rem;
`;

const SelectBox = styled.select`
  padding: 0.5rem;
  padding-right: 1.5rem; // 화살표 공간 확보
  font-size: 0rem;
  border: none;
  background-color: transparent;
  color: transparent;
  outline: none;
  cursor: pointer;
  appearance: none;

  // SVG 배경 이미지 절대 경로로
  background-image: url('/src/svg/arrow_down.svg');
  background-repeat: no-repeat;
  background-position: right 0.5rem center;

  &:focus {
    outline: none;
  }

  option {
    background-color: white;
    color: black;
    font-size: 1rem;
  }
`;

const BottomInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;
