import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import Image from '@/components/atoms/Image';
import Input from '@/components/atoms/Input';
// import FormItem from '@/components/molecules/walk/FormItem';
import { initTimeRef } from '@/components/pages/walk/GoWalk';
import { theme } from '@/styles/theme';
import TrashIcon from '@/svg/trash.svg';
import { BuddysType, SelectedBuddysType, TimeRef } from '@/types/map';
import { calculateTotalDistance } from '@/utils/mapUtils';

import { NAV_HEIGHT } from '../Nav';

export interface WalkModalProps {
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
}: WalkModalProps) {
  const [formData, setFormData] = useState({});
  // const navigate = useNavigate();

  const [totalDistance, setTotalDistance] = useState(0);
  const [dateTime, setDateTime] = useState<TimeRef>(initTimeRef);
  const [note, setNote] = useState<string>('');
  const [filterdBuddys, setFilterdBuddys] = useState<BuddysType[]>([]);

  const filterBuddys = useCallback(
    (buddyList: BuddysType[], selectedBuddys: SelectedBuddysType) =>
      buddyList.filter(({ id }) => {
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
          {/* <FormItem
            titleLabel={titleLabel}
            timeLabel={timeLabel}
            onChange={setFormData}
          /> */}

          <InfoItem>
            <Label>날짜</Label>
            <Value className="date">{dateTime.end.day}</Value>
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
  /* max-height: 35rem; */

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

const BuddyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.3rem 1rem;
`;
const BuddysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 6rem;
  overflow-y: auto;
  width: 100%;
`;
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

const FormItemWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const ModalHeader = styled.div<{ $isBottomLine: boolean; $lineThick: string }>`
  /* background-color: red; */
  display: flex;
  justify-content: left;
  position: relative;
  text-align: center;
  margin-bottom: 3rem;
  h3 {
    /* background-color: skyblue; */
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
