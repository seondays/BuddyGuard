import { UseKakaoMapProps } from '@/hooks/useKakaoMap';

export interface CaptureMapProps
  extends Omit<UseKakaoMapProps, 'buddys' | 'isTargetClicked' | 'setIsTargetClicked' | 'isStarted' | 'walkStatus'> {
  linePathRef: React.MutableRefObject<kakao.maps.LatLng[]>;
  canvasWidth?: number;
  canvasHeight?: number;
  canvasGridGab?: number;
}

/** canvas 셋팅 */
export const initCanvas = (canvas: HTMLCanvasElement, widthDefault: number, heightDefault: number) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  canvas.width = widthDefault;
  canvas.height = heightDefault;

  return ctx;
};

/** 위도/경도 범위 계산 */
export const calculateLatLng = (path: kakao.maps.LatLng[]) => {
  const latMin = Math.min(...path.map((p) => p.getLat()));
  const latMax = Math.max(...path.map((p) => p.getLat()));
  const lngMin = Math.min(...path.map((p) => p.getLng()));
  const lngMax = Math.max(...path.map((p) => p.getLng()));
  return { latMin, latMax, lngMin, lngMax };
};

/** 경로 그리기 */
export const drawPath = (
  ctx: CanvasRenderingContext2D,
  path: kakao.maps.LatLng[],
  canvasWidth: number,
  canvasHeight: number,
  canvasPaddingX: number,
  canvasPaddingY: number
) => {
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
};

/** canvas 배경 격자무늬 그리기 */
export const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, gab: number) => {
  ctx.strokeStyle = '#cccccc';
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= width; x += gab) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += gab) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  return ctx;
};

/** canvas 배경 채우기 */
export const fillBackground = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  return ctx;
};

/** 이미지 변환 및 저장 */
export const convertImageAndSave = (
  canvas: HTMLCanvasElement,
  setCapturedImage: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const dataUrl = canvas.toDataURL('image/png');
  setCapturedImage(dataUrl);
};
