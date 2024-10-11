import React, { useCallback, useEffect, useState } from 'react';
import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import styled from 'styled-components';

import Image from '@/components/atoms/Image';
import Input from '@/components/atoms/Input';
import { FormDataType } from '@/components/organisms/walk/WalkModal';
import { BuddysType, SelectedBuddysType } from '@/types/map';
import { calculateTotalDistance } from '@/utils/mapUtils';

interface WalkFormItemProps {
  linePathRef: React.MutableRefObject<kakao.maps.LatLng[]>;
  buddyList: BuddysType[];
  selectedBuddys: SelectedBuddysType;
  setValue: UseFormSetValue<FormDataType>;
  getValues: UseFormGetValues<FormDataType>;
}

export default function WalkFormItem({
  linePathRef,
  buddyList,
  selectedBuddys,
  setValue,
  getValues,
}: WalkFormItemProps) {
  // const [totalDistance, setTotalDistance] = useState(0);
  const [filterdBuddys, setFilterdBuddys] = useState<BuddysType[]>([]);
  const [note, setNote] = useState<string>('');

  const filterBuddys = useCallback(
    (buddyList: BuddysType[], selectedBuddys: SelectedBuddysType) =>
      buddyList.filter(({ id }) => {
        return selectedBuddys.includes(id);
      }),
    []
  );

  useEffect(() => {
    if (!linePathRef.current) return;
    const distance = calculateTotalDistance(linePathRef.current);
    setValue('distance', distance);
  }, [linePathRef, setValue]);

  useEffect(() => {
    setFilterdBuddys(filterBuddys(buddyList, selectedBuddys));
  }, [selectedBuddys, buddyList, filterBuddys]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
    setValue('note', e.target.value);
  };

  // const updateFormData = (updatedData: any) => {
  //   const formData = {
  //     title,
  //     note,
  //     selectedCategory,
  //     ...updatedData,
  //   };
  //   onChange(formData); // 입력된 모든 데이터를 합쳐서 onChange로 전달
  // };

  return (
    <>
      <InfoItem>
        <Label>날짜</Label>
        <Value className="date">{getValues('startDate')}</Value>
      </InfoItem>

      <InfoItem>
        <Label>거리</Label>
        <Value>{getValues('distance')}</Value>
        <SubValue>km</SubValue>
      </InfoItem>

      <InfoItem>
        <Label>시간</Label>
        <Value>{getValues('totalTime')}</Value>
        <SubValue>
          {getValues('startTime')} ~ {getValues('endTime')}
        </SubValue>
      </InfoItem>

      <InfoItem>
        <Label>버디</Label>
        <BuddysWrapper>
          {filterdBuddys.map(({ id, img, name }) => (
            <BuddyWrapper key={`select-${id}`}>
              <Image
                style={{ width: '2.5rem', border: '0.2rem solid white' }}
                $borderRadius={'50%'}
                $isHover={false}
                $isPointer={false}
                src={img}
                alt={name}
              />
              <SubValue>{`${name}`}</SubValue>
            </BuddyWrapper>
          ))}
        </BuddysWrapper>
      </InfoItem>

      <InfoItem>
        <Label>노트</Label>
        <Input
          id="note"
          type="text"
          value={note}
          onChange={handleNoteChange}
          $isBottomLine={false}
          style={{ marginBottom: '0rem' }}
        />
      </InfoItem>
    </>
  );
}

const InfoItem = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  & .date {
    font-size: 1rem;
  }
  margin-bottom: 2rem;
  ${({ theme }) =>
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      width: 100%;
      height:  0.05rem; 
      background-color: ${theme.themeValues.colorValues.grayscale[300]};
      z-index: 1000;
    }
   `}
`;

const Label = styled.span`
  width: 4rem;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  margin-left: 1rem;
`;

const Value = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  padding: 0.3rem 1rem;
  font-size: 1rem;
`;

const SubValue = styled.span`
  margin-left: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.currentTheme.textSecondary};
`;

const BuddysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 6rem;
  overflow-y: auto;
  width: 100%;
`;

const BuddyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.3rem 1rem;
`;
