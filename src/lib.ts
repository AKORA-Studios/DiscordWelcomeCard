import { Canvas } from '@napi-rs/canvas';
import { join } from 'path';
import { writeFileSync } from 'fs';

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

export var themes = {
  dark: { color: '#ffffff', image: path('images/dark.png') },
  circuit: { color: '#ffffff', image: path('images/circuit.png') },
  code: {
    color: '#ffffff',
    image: path('images/code.png'),
  },
};
