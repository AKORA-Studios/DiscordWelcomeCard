import { loadImage, Canvas, Image } from 'canvas';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { ImageResolvable } from './types';

// Snapshot system
const production = true;

var count = 0;
export function snap(c: Canvas) {
  if (!production) writeFileSync(`./testing/snapshots/${count}.png`, c.toBuffer('image/png'));
  count++;
}
//registerFont(require('@canvas-fonts/arial-bold'), { family: 'Arial Bold' });

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

export const root = join(__dirname, '..', 'images');
export var themes = {
  dark: { color: '#ffffff', image: join(root, 'dark.png') },
  circuit: { color: '#ffffff', image: join(root, 'circuit.png') },
  code: {
    color: '#ffffff',
    image: join(root, 'code.png'),
    font: 'Source Sans Pro',
  },
};
