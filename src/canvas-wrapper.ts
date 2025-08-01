const DEVICE_PIXEL_RATIO = window.devicePixelRatio
  // @ts-expect-error IE fallback
  || (window.screen.deviceXDPI / window.screen.logicalXDPI)
  || 1;

export class CanvasWrapper {

  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d")!;
  }

  setDimensions(width: number, height: number): void {
    this._canvas.width = width * DEVICE_PIXEL_RATIO;
    this._canvas.height = height * DEVICE_PIXEL_RATIO;
    this._canvas.style.width = `${width}px`;
    this._canvas.style.height = `${height}px`;
    this._context.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);
  }

  clear(fillStyle: string): void {
    this._context.fillStyle = fillStyle;
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }
}
