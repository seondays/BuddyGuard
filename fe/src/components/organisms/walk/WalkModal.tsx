import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import Image from '@/components/atoms/Image';
import Input from '@/components/atoms/Input';
// import FormItem from '@/components/molecules/walk/FormItem';
import { initTimeRef } from '@/components/pages/walk/GoWalk';
import TrashIcon from '@/svg/trash.svg';
import { BuddysType, SelectedBuddysType, TimeRef } from '@/types/map';
import { calculateTotalDistance } from '@/utils/mapUtils';

import { NAV_HEIGHT } from '../Nav';

interface ModalProps {
  // onClose: () => void;
  // onSubmit: (data: any) => void;
  titleLabel?: string;
  timeLabel?: string;
  formTitle: string;
  timeRef: React.MutableRefObject<TimeRef>;
  linePathRef: React.MutableRefObject<kakao.maps.LatLng[]>;
  selectedBuddys: SelectedBuddysType;
  buddyList: BuddysType[];
}

export default function WalkModal({
  // onClose,
  // onSubmit,
  formTitle,
  timeRef,
  linePathRef,
  selectedBuddys,
  buddyList,
}: ModalProps) {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [totalDistance, setTotalDistance] = useState(0);
  const [dateTime, setDateTime] = useState<TimeRef>(initTimeRef);
  const [note, setNote] = useState<string>('');
  const [filterdBuddys, setFilterdBuddys] = useState<BuddysType[]>([]);
  // [
  //   { 날짜: '2024년 8월 30일 금요일' },
  //   { 거리: '2024년 8월 30일 금요일' },
  //   { 시간: '2024년 8월 30일 금요일' },
  //   { 버디: '2024년 8월 30일 금요일' },
  // ];

  const filterBuddys = useCallback(
    (buddyList: BuddysType[], selectedBuddys: SelectedBuddysType) =>
      buddyList.filter(({ id }) => {
        console.log(typeof id);
        return selectedBuddys.includes(id);
      }),
    []
  );

  useEffect(() => {
    setFilterdBuddys(filterBuddys(buddyList, selectedBuddys));
  }, [selectedBuddys, buddyList]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
    // updateFormData({ note: e.target.value });
  };

  useEffect(() => {
    // { start: { day: '', time: '' }, end: { day: '', time: '' }, total: '' };
    if (!timeRef.current) return;
    setDateTime((prevDateTime) => ({
      ...prevDateTime,
      start: { ...timeRef.current.start },
      end: { ...timeRef.current.end },
      total: timeRef.current.total,
    }));
  }, [timeRef]);

  useEffect(() => {
    if (!linePathRef.current) return;
    setTotalDistance(() => calculateTotalDistance(linePathRef.current));
  }, [linePathRef]);

  const onClose = () => {
    console.log('close');
    navigate('/menu/walk/go');
  };
  return (
    <>
      <Overlay onClick={onClose} />

      <ModalContainer>
        <ModalHeader $isBottomLine={true} $lineThick={'0.15rem'}>
          <h3>{formTitle}</h3>
        </ModalHeader>

        <FormItemWrapper>
          {/* <FormItem
            titleLabel={titleLabel}
            timeLabel={timeLabel}
            onChange={setFormData}
          /> */}

          <InfoItem>
            <Label>날짜</Label>
            <Value>{dateTime.end.day}</Value>
          </InfoItem>

          <InfoItem>
            <Label>거리</Label>
            <Value>{totalDistance}</Value>
            <SubValue>km</SubValue>
          </InfoItem>

          <InfoItem>
            <Label>시간</Label>
            <Value>{dateTime.total}</Value>
            <SubValue>
              {dateTime.start.time} ~ {dateTime.end.time}
            </SubValue>
          </InfoItem>

          <InfoItem>
            <Label>버디</Label>
            <BuddysWrapper>
              {filterdBuddys &&
                filterdBuddys.map(({ id, img, name }) => (
                  <BuddyWrapper key={`select-${id}`}>
                    <Image style={{ width: '50%', marginTop: '1rem' }} $borderRadius={'50%'} src={img} alt={name} />
                    <SubValue>{`${name}${id}`}</SubValue>
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
        </FormItemWrapper>

        <ButtonWrapper>
          <StyledCloseButton onClick={onClose} $bgColor={'transparent'} style={{ border: `0.2rem solid grey` }}>
            <TrashIcon />
          </StyledCloseButton>
          <StyledSubmitButton onClick={() => console.log('등록')} $bgColor={'transparent'}>
            등록
          </StyledSubmitButton>
        </ButtonWrapper>
      </ModalContainer>
    </>
  );
}

const StyledCloseButton = styled(Button)`
  background-color: transparent;
`;
const StyledSubmitButton = styled(Button)`
  background-color: transparent;
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

const BuddyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const BuddysWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const InfoItem = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;

  margin-bottom: 2rem;
  ${({ theme }) =>
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      width: 95%;
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
`;

const SubValue = styled.span`
  margin-left: 1rem;
  font-size: 0.5rem;
  color: ${({ theme }) => theme.currentTheme.textSecondary};
`;

const FormItemWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

const ModalHeader = styled.div<{ $isBottomLine: boolean; $lineThick: string }>`
  display: flex;
  justify-content: left;
  padding: 0.5rem;
  position: relative;
  margin-bottom: 2rem;
  text-align: center;
  h3 {
    font-weight: bold;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.currentTheme.textPrimary};
  }

  ${({ $lineThick, theme }) =>
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      width: 95%;
      height:  ${$lineThick}; 
      background-color: ${theme.themeValues.colorValues.grayscale[300]};
      z-index: 1000;
    }
   `}
`;

const ModalContainer = styled.div`
  position: absolute;
  bottom: ${NAV_HEIGHT};
  width: 100%;

  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 999;

  background-color: ${({ theme }) => theme.currentTheme.modalBackground2};
  border: 0.2rem solid ${({ theme }) => theme.currentTheme.modalBackground};

  * {
    font-size: 0.9rem;
  }
`;
