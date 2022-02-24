import { loadImage, Canvas, Image, registerFont } from 'canvas';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { ImageResolvable } from './types';

//Path to the root directory of this package
export const rootDir = join(__dirname, '..');
function path(...paths: string[]) {
  return join(rootDir, ...paths);
}

//Load font
registerFont(path('fonts/segoeui.ttf'), { family: 'SegoeUI' });

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
