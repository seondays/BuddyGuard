import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';

import Image from '@/components/atoms/Image';
import Input from '@/components/atoms/Input';
import { FormDataType } from '@/components/organisms/walk/WalkModal';
import {
  centerChangedEventListener,
  createBasicMarker,
  createMap,
  createMarker,
  createPolyline,
  createStartEndMarker,
  drawPolylineOnMap,
  loadKakaoMapScript,
  moveMapTo,
} from '@/helper/kakaoMapHelpers';
import { PetInfo } from '@/stores/usePetStore';
import { BuddysType, PositionType } from '@/types/map';
import { path, record } from '@/types/walk';
import targetIcon from '@public/assets/icons/targetIcon.png';
import mascot from '@public/assets/images/mascot.png';

interface WalkDetailFormItemProps {
  detailRecords: record;
  setValue: UseFormSetValue<FormDataType>;
}

export default function WalkDetailFormItem({ detailRecords, setValue }: WalkDetailFormItemProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [changedPosition, setChangedPosition] = useState<PositionType | null>(null);
  const [isTargetClicked, setIsTargetClicked] = useState(false);
  const [buddyList, setBuddyList] = useState<BuddysType[]>([{ id: 0, img: '', name: '' }]);
  const [note, setNote] = useState<string>(detailRecords?.note);

  useEffect(() => {
    const petsStorage = localStorage.getItem('petsStorage');
    if (!petsStorage) return;
    const buddysList = JSON.parse(petsStorage)?.state?.petsInfo?.map(({ petId, petName, profileImage }: PetInfo) => ({
      id: petId,
      img: profileImage,
      name: petName,
    }));

    if (buddysList) {
      const filteredBuddysList = buddysList.filter(({ id }: { id: number }) => detailRecords.buddyIds.includes(id));
      setBuddyList(filteredBuddysList);
    }
  }, [detailRecords.buddyIds]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
    setValue('note', e.target.value);
  };

  /** 현재위치로 이동 및 위치 상태 업데이트 */
  const handleMapMoveAndStateUpdate = useCallback(() => {
    if (!map) return;
    const moveLatLon = new kakao.maps.LatLng(
      detailRecords.centerPosition.latitude,
      detailRecords.centerPosition.longitude
    );
    setIsTargetClicked(false);
    moveMapTo(map, moveLatLon, detailRecords.mapLevel + 1);
    setChangedPosition([moveLatLon.getLat(), moveLatLon.getLng()]);
  }, [
    map,
    setIsTargetClicked,
    detailRecords.centerPosition.latitude,
    detailRecords.centerPosition.longitude,
    detailRecords.mapLevel,
  ]);

  // 타겟버튼 클릭 시 지도 재조정
  useEffect(() => {
    if (isTargetClicked && map) handleMapMoveAndStateUpdate();
  }, [isTargetClicked, map, handleMapMoveAndStateUpdate]);

  const drawStartEndMarker = (paths: path[], mapInstance: kakao.maps.Map) => {
    // 시작 및 종료 위치 설정
    const { latitude: startLatitude, longitude: startLongitude } = paths[0];
    const { latitude: endLatitude, longitude: endLongitude } = paths[paths.length - 1];

    const startLocation: PositionType = [startLatitude, startLongitude];
    const endLocation: PositionType = [endLatitude, endLongitude];

    // 시작 위치에 마커 생성 및 위치 설정
    const startLatLng = new kakao.maps.LatLng(startLocation[0], startLocation[1]);
    const startMarker = createStartEndMarker(startLocation, mapInstance, 'start');
    startMarker.setPosition(startLatLng);

    // 종료 위치에 마커 생성 및 위치 설정
    const endLatLng = new kakao.maps.LatLng(endLocation[0], endLocation[1]);
    const endMarker = createStartEndMarker(endLocation, mapInstance, 'end');
    endMarker.setPosition(endLatLng);
  };

  // 최초에만 Kakao Map을 초기화
  useEffect(() => {
    const initMap = async () => {
      try {
        // 스크립트 로드
        await loadKakaoMapScript();

        const { latitude, longitude } = detailRecords.centerPosition;
        const centerLocation: PositionType = [latitude, longitude];

        // 지도 생성
        if (!(window.kakao && mapRef.current)) return;
        window.kakao.maps.load(() => {
          const mapInstance = createMap(centerLocation, mapRef, setChangedPosition, detailRecords.mapLevel + 1);

          const paths: path[] = detailRecords.path;

          const pathCoordinates = paths.map((point) => new kakao.maps.LatLng(point.latitude, point.longitude));
          if (mapInstance && pathCoordinates.length > 1) {
            const polyline = createPolyline(pathCoordinates);
            drawPolylineOnMap(mapInstance, polyline);
          }

          if (paths.length) drawStartEndMarker(paths, mapInstance);

          setMap(mapInstance);
        });
      } catch (error) {
        console.error('Map initialization error', error);
      }
    };

    // 최초 실행
    if (!map) initMap();

    return () => {
      if (map)
        kakao.maps.event.removeListener(map, 'center_changed', () =>
          centerChangedEventListener(map, setChangedPosition)
        );
    };
  }, [map, detailRecords.centerPosition, detailRecords.mapLevel, detailRecords.path]);

  return (
    <>
      <InfoItem>
        <StyledMapWrapper>
          <StyledMap ref={mapRef} />

          <StyledTargetIcon onClick={() => setIsTargetClicked((prev) => !prev)}>
            <img src={targetIcon} />
          </StyledTargetIcon>
        </StyledMapWrapper>
      </InfoItem>

      <InfoItem>
        <Label>날짜</Label>
        <Value className="date">{detailRecords?.startDate || ''}</Value>
      </InfoItem>

      <InfoItem>
        <Label>거리</Label>
        <Value>{detailRecords?.distance || 0}</Value>
        <SubValue>km</SubValue>
      </InfoItem>

      <InfoItem>
        <Label>시간</Label>
        <Value>{detailRecords?.totalTime || '00:00:00'}</Value>
        <SubValue>
          {detailRecords?.startTime || '00:00:00'} ~ {detailRecords?.endTime || '00:00:00'}
        </SubValue>
      </InfoItem>

      <InfoItem>
        <Label>버디</Label>
        <BuddysWrapper>
          {buddyList.map(({ id, img, name }) => (
            <BuddyWrapper key={`select-${id}`}>
              <Image
                style={{ width: '2.5rem', border: '0.2rem solid white', backgroundColor: 'beige' }}
                $borderRadius={'50%'}
                $isHover={false}
                $isPointer={false}
                src={img === 'none' ? mascot : img}
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
          value={note || ''}
          onChange={handleNoteChange}
          $isBottomLine={false}
          style={{ marginBottom: '0rem' }}
        />
      </InfoItem>
    </>
  );
}

const StyledTargetIcon = styled.div`
  position: absolute;
  z-index: 999;
  right: 1rem;
  bottom: 1rem;
  background-color: white;
  border: 0.2rem solid grey;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  cursor: pointer;

  & img {
    width: 80%;
    height: 80%;
  }
`;

const StyledMapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 30vh;
`;

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
