import { UseKakaoMapProps } from '@/hooks/useKakaoMap';
import { calculateLatLng } from '@/utils/mapUtils';

export interface CaptureMapProps
  extends Omit<UseKakaoMapProps, 'buddys' | 'isTargetClicked' | 'setIsTargetClicked' | 'isStarted' | 'walkStatus'> {
  linePathRef: React.MutableRefObject<kakao.maps.LatLng[]>;
  canvasWidth?: number;
  canvasHeight?: number;
  canvasGridGab?: number;
}

/** 경로 그리기 */
export const drawPath = (
  ctx: CanvasRenderingContext2D,
  path: kakao.maps.LatLng[],
  canvasWidth: number,
  canvasHeight: number,
  canvasPaddingX: number,
  canvasPaddingY: number
) => {
  try {
    console.log('🎨 3. 이미지에 경로 그리기');
    const { latMin, latMax, lngMin, lngMax } = calculateLatLng(path);
    if (!path || path.length === 0) return false; // 경로가 없으면 그리기를 실패

    // 경로 그리기
    ctx.beginPath();
    path.forEach((point, index) => {
      const x = canvasPaddingX + ((point.getLng() - lngMin) / (lngMax - lngMin)) * (canvasWidth - 2 * canvasPaddingX);
      const y =
        canvasHeight -
        canvasPaddingY -
        ((point.getLat() - latMin) / (latMax - latMin)) * (canvasHeight - 2 * canvasPaddingY);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#FFAE00';
    ctx.lineWidth = 3;
    ctx.stroke();

    return true;
  } catch (error) {
    console.error('drawpath:', error);
    return false;
  }
};

/** 이미지 변환 및 저장 */
export const convertImageAndSave = (
  canvas: HTMLCanvasElement,
  setCapturedImage: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedImage(dataUrl);
    console.log('🎨 4. 이미지 변환 및 저장');
  } catch (error) {
    console.error('convertImageAndSave error:', error);
  }
};
