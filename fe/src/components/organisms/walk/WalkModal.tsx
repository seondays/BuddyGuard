import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import WalkFormItem from '@/components/molecules/walk/WalkFormItem';
import { useWalkMutation } from '@/hooks/useWalkQuery';
import { theme } from '@/styles/theme';
import TrashIcon from '@/svg/trash.svg';
import { BuddysType, PositionType, SelectedBuddysType, TimeRef } from '@/types/map';
import { path } from '@/types/walk';

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
  changedPosition: PositionType | null;
  map: kakao.maps.Map | null;
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

const initFormData: FormDataType = {
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  totalTime: '',
  buddysId: [],
  note: '',
  centerPosition: { latitude: 0, longitude: 0 },
  mapLevel: 3,
  path: [],
  pathImage: '',
  distance: 0,
};

export default function WalkModal({
  formTitle,
  timeRef,
  linePathRef,
  selectedBuddys,
  buddyList,
  canvasRef,
  changedPosition,
  map,
}: WalkModalProps) {
  // const [dateTime, setDateTime] = useState<TimeRef>(initTimeRef);
  // const [formData, setFormData] = useState(initFormData);

  const { handleSubmit, setValue, getValues } = useForm<FormDataType>({
    defaultValues: initFormData,
  });

  const navigate = useNavigate();
  const walkMutation = useWalkMutation(); // 뮤테이션 훅 사용

  const onSubmit = async (data: FormDataType) => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      const form = new FormData();

      // 배열 데이터만 JSON으로 변환
      Object.keys(data).forEach((key) => {
        const typedKey = key as keyof FormDataType;

        if (typedKey === 'pathImage') return; // pathImage는 이 단계에서 처리하지 않고 넘어감

        const value = data[typedKey]; // 값을 안전하게 가져옴

        if (Array.isArray(value)) form.append(key, JSON.stringify(data[key as keyof FormDataType]));
        else form.append(key, data[key as keyof FormDataType] as string);
      });

      form.append('pathImage', blob, 'path-image.png');

      //TODO(Woody):API연동
      // 폼 데이터 콘솔에 출력
      for (const pair of form.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      walkMutation.mutate(form);
    }, 'image/png');
  };

  const onClose = () => {
    // 임시 컨펌창
    const isClose: boolean = confirm('저장을 취소하시겠습니까?');
    if (isClose) navigate('/');
  };

  useEffect(() => {
    const pathData = linePathRef.current.map((latLng) => ({
      latitude: latLng.getLat(),
      longitude: latLng.getLng(),
    }));
    setValue('path', pathData);
  }, [linePathRef, setValue]);

  useEffect(() => {
    if (!map) return;
    setValue('mapLevel', map?.getLevel() || 3);
  }, [map, setValue]);

  useEffect(() => {
    if (!changedPosition) return;

    setValue('centerPosition', {
      latitude: changedPosition[0],
      longitude: changedPosition[1],
    });
  }, [changedPosition, setValue]);

  useEffect(() => {
    if (!selectedBuddys) return;
    setValue('buddysId', selectedBuddys);
  }, [selectedBuddys, setValue]);

  useEffect(() => {
    if (!timeRef.current) return;
    const { start, end, total } = timeRef.current;
    setValue('startDate', start.day);
    setValue('endDate', end.day);
    setValue('startTime', start.time);
    setValue('endTime', end.time);
    setValue('totalTime', total);
  }, [timeRef, setValue]);

  useEffect(() => {});

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
          <WalkFormItem {...{ linePathRef, buddyList, selectedBuddys, setValue, getValues }}></WalkFormItem>
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
