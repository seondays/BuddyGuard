import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Input from '@/components/atoms/Input';
import {
  centerChangedEventListener,
  createMap,
  createPolyline,
  drawPolylineOnMap,
  loadKakaoMapScript,
  moveMapTo,
} from '@/helper/kakaoMapHelpers';
import { BuddysType, PositionType } from '@/types/map';
import { record } from '@/types/walk';
import targetIcon from '@public/assets/icons/targetIcon.png';

export default function WalkDetailFormItem({ detailRecords }: { detailRecords: record }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [changedPosition, setChangedPosition] = useState<PositionType | null>(null);
  const [isTargetClicked, setIsTargetClicked] = useState(false);

  const [filterdBuddys, setFilterdBuddys] = useState<BuddysType[]>([]);
  const [note, setNote] = useState<string>('');

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setNote(e.target.value);
    // setValue('note', e.target.value);
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
  }, [map, setIsTargetClicked]);

  // 타겟버튼 클릭 시 지도 재조정
  useEffect(() => {
    if (isTargetClicked && map) handleMapMoveAndStateUpdate();
  }, [isTargetClicked, map]);

  // 최초에만 Kakao Map을 초기화 (초기 한 번만 실행)
  useEffect(() => {
    const initMap = async () => {
      try {
        // 스크립트 로드
        await loadKakaoMapScript();

        const currentLocation = [detailRecords.centerPosition.latitude, detailRecords.centerPosition.longitude];

        // 지도 생성
        if (!(window.kakao && mapRef.current)) return;
        window.kakao.maps.load(() => {
          const mapInstance = createMap(currentLocation, mapRef, setChangedPosition, detailRecords.mapLevel + 1);
          // const newMarker = createMarker(currentLocation, mapInstance);
          setMap(mapInstance);
          // markerRef.current = newMarker;
          const pathCoordinates = detailRecords.path.map(
            (point) => new kakao.maps.LatLng(point.latitude, point.longitude)
          );

          if (mapInstance && pathCoordinates.length > 1) {
            const polyline = createPolyline(pathCoordinates);
            drawPolylineOnMap(mapInstance, polyline);
          }
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
  }, [map, detailRecords.centerPosition]);

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
          {/* {filterdBuddys.map(({ id, img, name }) => (
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
          ))} */}
        </BuddysWrapper>
      </InfoItem>

      <InfoItem>
        <Label>노트</Label>
        <Input
          id="note"
          type="text"
          value={detailRecords?.note || ''}
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
  height: 25vh;
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
