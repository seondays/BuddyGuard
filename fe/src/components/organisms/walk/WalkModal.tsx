import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import WalkFormItem from '@/components/molecules/walk/WalkFormItem';
import { initTimeRef } from '@/components/pages/walk/GoWalk';
import { theme } from '@/styles/theme';
import TrashIcon from '@/svg/trash.svg';
import { BuddysType, SelectedBuddysType, TimeRef } from '@/types/map';

import { NAV_HEIGHT } from '../Nav';

export interface WalkModalProps {
  titleLabel?: string;
  timeLabel?: string;
  formTitle: string;
  timeRef: React.MutableRefObject<TimeRef>;
  linePathRef: React.MutableRefObject<kakao.maps.LatLng[]>;
  selectedBuddys: SelectedBuddysType;
  buddyList: BuddysType[];
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

const initFormData = {
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  totalTime: '',
  buddysId: [1, 2],
  note: '',
  centerPosition: [],
  mapLevel: 3,
  path: [
    { lat: 37.5297067082716, lng: 126.6616366315937 },
    { lat: 37.5297067082716, lng: 126.6616366315937 },
  ],
  pathImage: '',
};
// const pathData = linePathRef.current.map(
//   ({ La, Ma }): kakao.maps.LatLng => ({
//     lat: Ma, // 위도
//     lng: La, // 경도
//   })
// );
// console.log('pathData : ', pathData);

export default function WalkModal({
  formTitle,
  timeRef,
  linePathRef,
  selectedBuddys,
  buddyList,
  canvasRef,
}: WalkModalProps) {
  const [formData, setFormData] = useState(initFormData);

  const [dateTime, setDateTime] = useState<TimeRef>(initTimeRef);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (!timeRef.current) return;
    setDateTime((prevDateTime) => ({
      ...prevDateTime,
      start: { ...timeRef.current.start },
      end: { ...timeRef.current.end },
      total: timeRef.current.total,
    }));
  }, [timeRef]);

  const onClose = () => {
    console.log('close');
    // navigate('/menu/walk/go');
  };

  const defaultColor = theme.colorValues.special.textForce;
  const defaultGray = theme.colorValues.grayscale[200];

  return (
    <>
      <Overlay onClick={onClose} />

      <ModalContainer>
        <ModalHeader $isBottomLine={true} $lineThick={'0.15rem'}>
          <h3>{formTitle}</h3>
        </ModalHeader>

        <FormItemWrapper>
          <WalkFormItem {...{ linePathRef, buddyList, selectedBuddys }}></WalkFormItem>
        </FormItemWrapper>

        <ButtonWrapper>
          <Button
            onClick={onClose}
            $bgColor={'transparent'}
            style={{ border: `0.3rem solid ${defaultGray}`, borderRadius: '1rem', width: '6rem' }}
          >
            <TrashIcon />
          </Button>
          <Button
            onClick={() => console.log('등록')}
            $bgColor={defaultColor}
            style={{ border: 'none', borderRadius: '1rem', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            저 장
          </Button>
        </ButtonWrapper>
      </ModalContainer>
    </>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  bottom: ${NAV_HEIGHT};
  width: 100%;
  min-width: 23rem;
  padding: 1.3rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 999;
  background-color: ${({ theme }) => theme.currentTheme.modalBackground2};
  border: 0.2rem solid ${({ theme }) => theme.currentTheme.modalBackground};

  * {
    font-size: 0.9rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const FormItemWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const ModalHeader = styled.div<{ $isBottomLine: boolean; $lineThick: string }>`
  display: flex;
  justify-content: left;
  position: relative;
  text-align: center;
  margin-bottom: 3rem;

  & h3 {
    font-weight: bold;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.currentTheme.textPrimary};
    margin-left: 1rem;
  }

  ${({ $lineThick, theme }) =>
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1.5rem;
      width: 100%;
      height:  ${$lineThick}; 
      background-color: ${theme.themeValues.colorValues.grayscale[300]};
      z-index: 1000;
    }
  `}
`;
