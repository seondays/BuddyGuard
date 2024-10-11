import { useCallback, useEffect, useRef, useState } from 'react';

import { IsStartedType } from '@/components/pages/walk/GoWalk';
import { DEFAULT_MAP_LEVEL, DEFAULT_MAP_POSITION } from '@/constants/map';
import { convertImageAndSave, drawPath } from '@/helper/drawHelpers';
import {
  adjustMapBounds,
  centerChangedEventListener,
  createMap,
  createMarker,
  createOverLayElement,
  createPolyline,
  drawPolylineOnMap,
  getcurrentLocation,
  getMapPosition,
  isPositionsDifferent,
  loadKakaoMapScript,
  moveMapTo,
  setOverlay,
} from '@/helper/kakaoMapHelpers';
import { BuddysType, PositionPair, PositionType, SelectedBuddysType, StatusOfTime } from '@/types/map';
import { drawGrid, fillBackground, initCanvas } from '@/utils/canvasUtils';
import { calculateTotalDistance } from '@/utils/mapUtils';
import { getCurrentDate } from '@/utils/timeUtils';
import { delay } from '@/utils/utils';

export interface UseKakaoMapProps {
  mapRef: React.RefObject<HTMLDivElement>;
  buddyList: BuddysType[];
  selectedBuddys: SelectedBuddysType;
  isTargetClicked: boolean;
  setIsTargetClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isStarted: IsStartedType;
  setIsStarted: React.Dispatch<React.SetStateAction<IsStartedType>>;
  walkStatus: StatusOfTime;
  setCapturedImage: React.Dispatch<React.SetStateAction<string | null>>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  linePathRef: React.MutableRefObject<kakao.maps.LatLng[]>;
  changedPosition: PositionType | null;
  setChangedPosition: React.Dispatch<React.SetStateAction<PositionType | null>>;
  map: kakao.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<kakao.maps.Map | null>>;
}

export interface SetOverlayProps {
  isStarted: IsStartedType;
  selectedBuddys: SelectedBuddysType;
  markerRef: React.MutableRefObject<kakao.maps.Marker | null>;
  overlayRef: React.MutableRefObject<kakao.maps.CustomOverlay | null>;
  map: kakao.maps.Map | null;
  customContents: HTMLDivElement;
  closeButton: HTMLImageElement;
}

export const useKakaoMap = ({
  mapRef,
  buddyList,
  selectedBuddys,
  isTargetClicked,
  setIsTargetClicked,
  isStarted,
  setIsStarted,
  walkStatus,
  setCapturedImage,
  canvasRef,
  linePathRef,
  changedPosition,
  setChangedPosition,
  map,
  setMap,
}: UseKakaoMapProps) => {
  const simulateIntervalID = useRef<NodeJS.Timeout | null>(null);

  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const overlayRef = useRef<kakao.maps.CustomOverlay | null>(null);

  const [positions, setPositions] = useState<PositionPair>({
    previous: null, // 초기에는 이전 위치가 없으므로 null
    current: DEFAULT_MAP_POSITION, // 기본 위치를 현재 위치로 설정
  });

  const canvasWidth = 600;
  const canvasHeight = 600;
  const canvasGridGab = 50;
  const canvasPaddingX = canvasWidth * 0.1;
  const canvasPaddingY = canvasHeight * 0.1;

  /** 마커의 새로운 위치로 오버레이 이동 */
  const replaceCustomOverLay = ({ overlayRef, markerRef }: Pick<SetOverlayProps, 'overlayRef' | 'markerRef'>) => {
    if (!(overlayRef.current && markerRef.current)) return;
    overlayRef.current.setPosition(markerRef.current.getPosition());
  };

  const updatePosition = useCallback(
    (prev: PositionPair): PositionPair => {
      const currentPosition = prev.current;
      const updatedPosition: PositionType = [
        currentPosition[0] + Math.random() * 0.001,
        currentPosition[1] + Math.random() * 0.001,
      ];

      const newLatLng = new kakao.maps.LatLng(updatedPosition[0], updatedPosition[1]);

      // linePath에 좌표 추가
      linePathRef.current.push(newLatLng);

      // 마커+오버레이 위치 변경
      markerRef.current?.setPosition(newLatLng);
      overlayRef.current?.setPosition(newLatLng);

      return { previous: currentPosition, current: updatedPosition };
    },
    [linePathRef]
  );

  /** 선을 지도에 그리는 함수 */
  const handleDrawPolyline = useCallback(() => {
    if (map && linePathRef.current.length > 1) {
      const polyline = createPolyline(linePathRef.current);
      drawPolylineOnMap(map, polyline);
    }
  }, [map, linePathRef]);

  /** 임의의 위치 업데이트 함수 */
  const simulateLocationUpdate = useCallback(() => {
    const intervalId = setInterval(() => {
      // 위치 업데이트
      setPositions(updatePosition);
      // 지도에 경로 선 그리기
      handleDrawPolyline();
    }, 2000);

    return intervalId;
  }, [handleDrawPolyline, updatePosition]);

  const clearSimulate = () => {
    if (!simulateIntervalID.current) return;
    clearInterval(simulateIntervalID?.current);
    simulateIntervalID.current = null;
  };

  /** 현재위치로 이동 및 위치 상태 업데이트 */
  const handleMapMoveAndStateUpdate = useCallback(() => {
    const moveLatLon = getMapPosition(positions);
    setIsTargetClicked(false);
    setChangedPosition([positions.current[0], positions.current[1]]);
    if (!map) return;
    moveMapTo(map, moveLatLon, DEFAULT_MAP_LEVEL);
  }, [map, setIsTargetClicked, positions, setChangedPosition]);

  // 마커의 새로운 위치로 오버레이 이동
  useEffect(() => {
    if (isStarted === 'start' && map && selectedBuddys.length) {
      replaceCustomOverLay({ overlayRef, markerRef });
    }
  }, [isStarted, map, selectedBuddys, buddyList]);

  // 오버레이 설정
  useEffect(() => {
    if (!(isStarted === 'start' && map && selectedBuddys.length && markerRef.current)) return;
    const { customContents, closeButton } = createOverLayElement(selectedBuddys, buddyList);
    setOverlay({ isStarted, selectedBuddys, overlayRef, markerRef, map, customContents, closeButton });
  }, [isStarted, map, selectedBuddys, buddyList]);

  // 산책 종료 후 경로 그리고 이미지 저장
  useEffect(() => {
    const donelogic = async () => {
      if (!canvasRef.current) return;
      if (!(changedPosition && walkStatus === 'stop' && mapRef.current)) return;

      const canvas = canvasRef.current;
      const ctx = initCanvas(canvas, canvasWidth, canvasHeight);
      if (!ctx) return;
      const filledCtx = fillBackground(ctx, canvasWidth, canvasHeight);
      const gridedCtx = drawGrid(filledCtx, canvasWidth, canvasHeight, canvasGridGab);

      const linePath = linePathRef.current;
      if (!(linePath && linePath.length > 0)) return;

      const isDrawn = drawPath(gridedCtx, linePath, canvasWidth, canvasHeight, canvasPaddingX, canvasPaddingY);

      if (isDrawn) convertImageAndSave(canvas, setCapturedImage);

      const totalDistanceInKm = calculateTotalDistance(linePathRef.current);
      console.log(`🏃‍♀️💦 Total Distance: ${totalDistanceInKm} km`);

      const endDate = getCurrentDate(true, false);
      console.log(`🏃‍♀️💦 End Date: ${endDate}`);

      await delay(1500);
      setIsStarted('done');

      console.log('map Level : ', map?.getLevel());

      console.log('center Position : ', changedPosition);
      console.log('center Position.getLat() : ', changedPosition[0]);
      console.log('center Position.getLng() : ', changedPosition[1]);
      const pathData = linePathRef.current.map((latLng) => ({
        lat: latLng.getLat(),
        lng: latLng.getLng(),
      }));
      console.log('pathData : ', pathData);
    };

    // 산책 종료 후 경로 그리고 이미지 저장
    donelogic();
  }, [canvasPaddingX, canvasPaddingY, canvasRef, changedPosition, mapRef, setCapturedImage, walkStatus]);

  // 종료 버튼
  useEffect(() => {
    if (walkStatus === 'stop' && map && linePathRef.current && overlayRef.current) {
      adjustMapBounds(map, linePathRef.current);

      // 지도 범위가 설정된 후 중심 좌표 및 레벨 저장
      const newCenter = map.getCenter();

      setChangedPosition([newCenter.getLat(), newCenter.getLng()]);

      overlayRef.current.setMap(null);
    }
  }, [map, walkStatus]);

  // 일시 중지, 시작 버튼
  useEffect(() => {
    if (walkStatus === 'pause' && simulateIntervalID.current) clearSimulate();
    if (walkStatus === 'start' && isPositionsDifferent(positions, changedPosition) && map)
      handleMapMoveAndStateUpdate();
  }, [walkStatus, handleMapMoveAndStateUpdate, positions, changedPosition, map]);

  // 위치 업데이트 인터벌 관리
  useEffect(() => {
    if (isStarted !== 'start') return;
    if (walkStatus === 'stop' || walkStatus === 'pause') return;
    simulateIntervalID.current = simulateLocationUpdate();

    return () => {
      if (simulateIntervalID.current) clearSimulate();
    };
  }, [isStarted, simulateLocationUpdate, walkStatus]);

  // 위치가 변경되었을 때 지도 중심 이동 (지도 다시 초기화하지 않음)
  useEffect(() => {
    if (map && positions.previous) {
      const moveLatLon = getMapPosition(positions);
      setChangedPosition(() => [positions.current[0], positions.current[1]]);
      moveMapTo(map, moveLatLon, DEFAULT_MAP_LEVEL);
    }
  }, [positions, map]);

  // 타겟버튼 클릭 시 지도 재조정
  useEffect(() => {
    if (isTargetClicked && walkStatus === 'stop' && map) {
      adjustMapBounds(map, linePathRef.current);
      setIsTargetClicked(false);
      return;
    }
    if (isTargetClicked && isPositionsDifferent(positions, changedPosition) && map && walkStatus !== 'stop')
      handleMapMoveAndStateUpdate();
  }, [isTargetClicked, positions, changedPosition, map, walkStatus, handleMapMoveAndStateUpdate, setIsTargetClicked]);

  // 최초에만 Kakao Map을 초기화 (초기 한 번만 실행)
  useEffect(() => {
    const initMap = async () => {
      try {
        // 스크립트 로드
        await loadKakaoMapScript();

        // 위치 가져오기
        const currentLocation = await getcurrentLocation();
        setPositions((prev) => ({ ...prev, current: currentLocation }));

        // 지도 생성
        if (!(window.kakao && mapRef.current)) return;
        window.kakao.maps.load(() => {
          const mapInstance = createMap(currentLocation, mapRef, setChangedPosition);
          const newMarker = createMarker(currentLocation, mapInstance);
          setMap(mapInstance);
          markerRef.current = newMarker;
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
  }, [mapRef, map, selectedBuddys, buddyList]);

  useEffect(() => {
    const handleResize = () => {
      if (!map) return;
      map.relayout();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [map]);

  return map;
};
