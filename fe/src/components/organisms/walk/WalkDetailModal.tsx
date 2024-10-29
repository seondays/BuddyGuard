import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import WalkDetailFormItem from '@/components/molecules/walk/WalkDetailFormItem';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
import { FormDataPatchType } from '@/components/organisms/walk/WalkModal';
import { useWalkPatchMutation } from '@/hooks/useWalkQuery';
import { usePetStore } from '@/stores/usePetStore';
import { theme } from '@/styles/theme';
import TrashIcon from '@/svg/trash.svg';
import { path, record } from '@/types/walk';

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

interface WalkDetailModalProps {
  detailRecords: record;
  setIsClickedDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const initForm = (detailRecords: record) => {
  const { note } = detailRecords;

  return { note };
};

export default function WalkDetailModal({ detailRecords, setIsClickedDetail }: WalkDetailModalProps) {
  const { selectedBuddy } = usePetStore();
  const { handleSubmit, setValue } = useForm<FormDataPatchType>({
    defaultValues: initForm(detailRecords),
  });

  const navigate = useNavigate();

  const onErrorFn = () => {
    message.error('😿 수정에 실패하였습니다.');
    navigate('/menu/walk');
  };
  const onSuccessFn = () => {
    message.success('🐶 수정되었습니다.');
    navigate('/menu/walk');
  };

  const putMutation = useWalkPatchMutation({ onSuccessFn, onErrorFn }); // 뮤테이션 훅 사용

  const onClose = () => {
    setIsClickedDetail(false);
  };

  const handleDelete = () => {
    console.log('삭제');
    // const petId = selectedBuddy?.petId;
    // const recordId = detailRecords.id;

    // if (!petId) return;
  };

  const onSubmit = async (formData: FormDataPatchType) => {
    const petId = selectedBuddy?.petId;
    const recordId = detailRecords.id;

    if (!petId) return;

    putMutation.mutate({ formData, petId, recordId });
  };
  const defaultColor = theme.colorValues.special.textForce;
  const defaultGray = theme.colorValues.grayscale[200];
  return (
    <>
      <Overlay onClick={onClose} />

      <ModalContainer>
        <ModalHeader $isBottomLine={true} $lineThick={'0.15rem'}>
          <h3>산책 상세 기록</h3>
        </ModalHeader>

        <FormItemWrapper>
          <WalkDetailFormItem detailRecords={detailRecords} setValue={setValue}></WalkDetailFormItem>
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
            onClick={handleSubmit(onSubmit)}
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
