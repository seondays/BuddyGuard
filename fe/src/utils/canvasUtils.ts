/** canvas 셋팅 */
export const initCanvas = (canvas: HTMLCanvasElement, widthDefault: number, heightDefault: number) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  canvas.width = widthDefault;
  canvas.height = heightDefault;

  return ctx;
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
