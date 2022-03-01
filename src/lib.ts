import { loadImage, Canvas, Image, CanvasRenderingContext2D } from 'canvas';
import { join } from 'path';
import { writeFileSync } from 'fs';
import * as drawMultilineText from 'canvas-multiline-text';
import { ImageResolvable, MultilineOptions, Style } from './types';

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
  public style?: Style;
  public strokeOn: boolean;
  public font?: string;
  public fontSize?: string;
  public multilineOpts?: MultilineOptions;

  constructor(text: string, posX: number, posY: number) {
    this.text = text;
    this.x = posX;
    this.y = posY;
    this.strokeOn = false;
  }

  setFont(font: string) {
    this.font = font;
    return this;
  }
  setFontSize(size: string) {
    this.fontSize = size;
    return this;
  }
  setStyle(style: Style) {
    this.style = style;
    return this;
  }

  multiline(opts: MultilineOptions) {
    this.multilineOpts = opts;
  }

  stroke(): this;
  stroke(enabled?: boolean) {
    this.strokeOn = enabled ?? true;
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

    if (this.x < 1 && this.y < 1) {
      this.x *= ctx.canvas.width;
      this.y *= ctx.canvas.height;
    }

    if (this.textAlign) ctx.textAlign = this.textAlign;
    if (this.style) {
      ctx.fillStyle = this.style;
      ctx.strokeStyle = this.style;
    }
    if (this.font) ctx.changeFont(this.font);
    if (this.fontSize) ctx.changeFontSize(this.fontSize);

    let maxW: number = maxWidth ?? ctx.w - this.x;

    if (this.multilineOpts) {
      drawMultilineText(ctx, this.text, {
        rect: {
          x: this.x,
          y: this.y,
          width: this.multilineOpts.width,
          height: this.multilineOpts.height,
        },
        lineHeight: this.multilineOpts.lineHeight,
        minFontSize: this.fontSize,
        maxFontSize: this.fontSize,
      });
    } else {
      if (this.strokeOn) {
        ctx.strokeText(this.text, this.x, this.y, maxW);
      } else ctx.fillText(this.text, this.x, this.y, maxW);
    }
    Object.assign(ctx, before);
  }
}
