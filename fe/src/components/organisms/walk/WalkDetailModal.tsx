import { message } from 'antd';
import confirm from 'antd/es/modal/confirm';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import WalkDetailFormItem from '@/components/molecules/walk/WalkDetailFormItem';
import WalkFormItem from '@/components/molecules/walk/WalkFormItem';
import { useWalkMutation } from '@/hooks/useWalkQuery';
import { theme } from '@/styles/theme';
import TrashIcon from '@/svg/trash.svg';
import { BuddysType, PositionType, SelectedBuddysType, TimeRef } from '@/types/map';
import { path, record } from '@/types/walk';

import { NAV_HEIGHT } from '../Nav';

export interface WalkDetailModalProps extends Omit<record, 'buddyIds' | 'centerPosition'> {
  buddyIds: number[];
  centerPosition: path;
}

export interface FormDataType {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  totalTime: string;
  buddysId: number[];
  note: string;
  centerPosition: path;
  mapLevel: number;
  path: path[];
  pathImage: string; // 이미지 URL 또는 base64
  distance: number;
}

// export default function WalkDetailModal({ detailRecords }: { detailRecords: WalkDetailModalProps }) {
export default function WalkDetailModal({ detailRecords }: { detailRecords: record }) {
  // const { handleSubmit, setValue, getValues } = useForm<FormDataType>({
  //   defaultValues: initFormData,
  // });

  console.log(detailRecords);

  const navigate = useNavigate();

  const onErrorFn = () => {
    message.error('😿 등록에 실패하였습니다.');
    navigate('/');
  };
  const onSuccessFn = () => {
    message.success('🐶 등록에 성공하였습니다.');
    navigate('/menu/walk');
  };

  const walkMutation = useWalkMutation({ onSuccessFn, onErrorFn }); // 뮤테이션 훅 사용

  const onClose = () => {};

  const handleDelete = () => {
    console.log('삭제');
  };
  const defaultColor = theme.colorValues.special.textForce;
  const defaultGray = theme.colorValues.grayscale[200];
  console.log(2);

  return (
    <>
      <Overlay onClick={onClose} />

      <ModalContainer>
        <ModalHeader $isBottomLine={true} $lineThick={'0.15rem'}>
          <h3>산책 상세 기록</h3>
        </ModalHeader>

        <FormItemWrapper>
          <WalkDetailFormItem detailRecords={detailRecords}></WalkDetailFormItem>
        </FormItemWrapper>

        <ButtonWrapper>
          <Button
            onClick={handleDelete}
            $bgColor={'transparent'}
            style={{ border: `0.3rem solid ${defaultGray}`, borderRadius: '1rem', width: '6rem' }}
          >
            <TrashIcon />
          </Button>
          <Button
            // onClick={handleSubmit(onSubmit)}
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
  height: 70vh;

  min-width: 23rem;
  padding: 1.3rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 999;
  background-color: ${({ theme }) => theme.currentTheme.modalBackground2};
  border: 0.2rem solid ${({ theme }) => theme.currentTheme.modalBackground};

  display: flex;
  flex-direction: column;
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
  overflow-y: auto;
  height: 100%;
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
