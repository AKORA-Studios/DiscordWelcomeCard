import { loadImage, Canvas, Image, CanvasRenderingContext2D } from 'canvas';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { ImageResolvable, Style } from './types';

//Path to the root directory of this package
export const rootDir = join(__dirname, '..');
function path(...paths: string[]) {
  return join(rootDir, ...paths);
}

// Snapshot system
const production = true;

var count = 0;
export function snap(c: Canvas) {
  if (!production) writeFileSync(`./testing/snapshots/${count}.png`, c.toBuffer('image/png'));
  count++;
}

export function getFontSize(str: string) {
  if (str.length < 18) return 30;
  return (600 * Math.pow(str.length, -1.05)).toFixed(0);
}

export async function toImage(image: ImageResolvable, name?: string) {
  if (image instanceof Canvas) {
    let img = new Image();
    img.src = (image as Canvas).toDataURL();
    return img;
  } else if (image instanceof Image) return image;
  else if (typeof image === 'string' || image instanceof Buffer) return await loadImage(image);
  else throw new Error('Invalid Image Format for: ' + name ?? 'Image');
}

export var themes = {
  dark: { color: '#ffffff', image: path('images/dark.png') },
  circuit: { color: '#ffffff', image: path('images/circuit.png') },
  code: {
    color: '#ffffff',
    image: path('images/code.png'),
  },
};

export class Text {
  public x: number;
  public y: number;
  public text: string;
  public textAlign?: CanvasTextAlign;
  public strokeStyle?: Style;
  public fillStyle?: Style;
  public font?: string;
  public fontSize?: string;

  constructor(text: string, posX: number, posY: number) {
    this.text = text;
    this.x = posX;
    this.y = posY;
  }

  setFont(font: string) {
    this.font = font;
    return this;
  }
  setFontSize(size: string) {
    this.fontSize = this.fontSize;
    return this;
  }
  setFillStyle(style: Style) {
    this.fillStyle = style;
    return this;
  }

  setStrokeStyle(style: Style) {
    this.strokeStyle = style;
    return this;
  }

  public draw(ctx: CanvasRenderingContext2D, maxWidth?: number) {
    const before = JSON.parse(
      JSON.stringify({
        font: ctx.font,
        textAlign: ctx.textAlign,
        fillStyle: ctx.fillStyle,
        strokeStyle: ctx.strokeStyle,
      })
    );

    if (this.textAlign) ctx.textAlign = this.textAlign;
    if (this.fillStyle) ctx.fillStyle = this.fillStyle;
    if (this.strokeStyle) ctx.strokeStyle = this.strokeStyle;
    if (this.font) ctx = ctx.changeFont(this.font);
    if (this.fontSize) ctx = ctx.changeFontSize(this.fontSize);

    if (this.strokeStyle) {
      ctx.strokeText(this.text, this.x, this.y, maxWidth);
    } else ctx.fillText(this.text, this.x, this.y, maxWidth);

    Object.assign(ctx, before);
  }
}
