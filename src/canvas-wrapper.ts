const DEVICE_PIXEL_RATIO = window.devicePixelRatio
  // @ts-expect-error IE fallback
  || (window.screen.deviceXDPI / window.screen.logicalXDPI)
  || 1;

export class CanvasWrapper {

  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d")!;
    this._width = width;
    this._height = height;
    this.setDimensions(width, height);
  }

  setDimensions(width: number, height: number): void {
    this._width = width;
    this._height = height;
    this._canvas.width = width * DEVICE_PIXEL_RATIO;
    this._canvas.height = height * DEVICE_PIXEL_RATIO;
    this._canvas.style.width = `${width}px`;
    this._canvas.style.height = `${height}px`;
    this._context.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);
  }

  setElapsed(elapsedColour: string, percentElapsed: number) {
    console.log('drawing rect', this._width, percentElapsed, this._width * percentElapsed, this._height);
    this._context.beginPath();
    this._context.rect(0, 0, this._width * percentElapsed, this._height);
    this._context.fillStyle = elapsedColour;
    this._context.fill();
  }

  clear(fillStyle: string): void {
    this._context.fillStyle = fillStyle;
    this._context.fillRect(0, 0, this._width, this._height);
  }
}
