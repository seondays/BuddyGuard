import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Image from '@/components/atoms/Image';
import Span from '@/components/atoms/Span';
import { usePetStore } from '@/stores/usePetStore';
import { PetInfo } from '@/types/pet';

export default function BuddyInfoBar() {
  const { petsInfo } = usePetStore();
  const [selectedBuddy, setSelectedBuddy] = useState<PetInfo | null>(petsInfo[0] || null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [showChangeText, setShowChangeText] = useState(true);

  const handleBuddyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const buddyId = parseInt(e.target.value, 10);
    const selectedBuddy = petsInfo.find((buddy) => buddy.petId === buddyId);
    setSelectedBuddy(selectedBuddy || null);
    setShowChangeText(true);
  };

  if (petsInfo.length === 0) {
    return (
      <StyledBarWrapper>
        <Span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>버디를 등록해주세요</Span>
      </StyledBarWrapper>
    );
  }

  return (
    <StyledBarWrapper>
      <TopInfo>
        <BuddyInfo>
          <StyledImage src="/assets/images/mascot.png" alt="버디 이미지" />
          <StyledSpan>{selectedBuddy?.petName || '버디 이름'}</StyledSpan>
        </BuddyInfo>
        <SelectWrapper>
          <SelectBox
            onClick={() => setShowChangeText(false)}
            onChange={handleBuddyChange}
            value={showChangeText ? '' : selectedBuddy?.petId}
          >
            <option value="" disabled>
              {showChangeText ? '버디 변경' : '버디 선택'} {/* Static text */}
            </option>
            {petsInfo.map((buddy) => (
              <option key={buddy.petId} value={buddy.petId}>
                {buddy.petName}
              </option>
            ))}
          </SelectBox>
        </SelectWrapper>
      </TopInfo>

      {isHome && (
        <BottomInfo>
          <Span>미해결</Span>
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
  background-color: ${({ theme }) => theme.themeValues.colorValues.special.modalBg};
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
`;

const StyledSpan = styled(Span)`
  font-size: 1.2rem;
`;

const SelectWrapper = styled.div`
  margin-left: 1rem;
`;

const SelectBox = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  background-color: transparent;
  color: #333;
  outline: none;
  cursor: pointer;
  appearance: none;
  box-shadow: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

const BottomInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;
