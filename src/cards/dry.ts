import { Timer, toImage, roundRect, ctx2D, blur } from '@discord-card/core';
import { createCanvas, Image, Canvas } from 'canvas';
import { readFile } from 'fs/promises';
import { themes, snap } from '../lib';
import { CardOptions } from '../types';

const dryMap: { [name: string]: Canvas } = {};

export async function staticCard(options: CardOptions): Promise<Canvas> {
  //check for existing
  if (options.generation?.static && dryMap[options.generation?.static]) {
    return dryMap[options.generation.static];
  }

  //const timer = new Timer('Prepare').start();

  const timer = {
    step: (...args: any[]) => {},
    stop: (...args: any[]) => {},
  };

  const w = 700,
    h = 250;
  let canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  timer.step('created Canvas');

  //@ts-ignore
  let theme: Theme;
  let background: Image;

  options.card ??= {};
  options.card.border ??= true;
  options.card.rounded ??= true;

  //Parsing the Theme
  if (typeof (options.theme ?? 'code') === 'string') {
    theme = themes[options.theme ?? 'code'];
    if (!theme) throw new Error('Invalid theme, use: ' + Object.keys(themes).join(' | '));

    background = await toImage(await readFile(theme.image as string));
  } else throw new Error('Invalid theme, use: ' + Object.keys(themes).join(' | '));

  if (options.card.background) background = await toImage(options.card.background, 'Background');

  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  let backgroundScale = h / background.height;
  if (w / background.width > backgroundScale) {
    backgroundScale = w / background.width;
  }
  //console.log(backgroundScale);

  let backXOff = (background.width - backgroundScale * background.width) / 2,
    backYOff = (background.height - backgroundScale * background.height) / 2;

  //console.log(backXOff, backYOff);

  timer.step('loaded Background');

  /** Border width */
  const b = 10; //Border

  //Background
  snap(canvas);
  if (options.card?.rounded) {
    roundRect(ctx, 0, 0, w, h, h / 15);
    ctx.clip();
  }

  if (options.card?.border) {
    ctx.drawImage(background, backXOff, backYOff, w, h, 0, 0, w, h);
    //ctx.drawImage(background, 0, 0, w, h);

    //darken the borders
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    //StackBlur.canvasRGBA(ctx.canvas as any, 0, 0, w, h, 9);
    canvas = blur(canvas, 3);

    if (options.card?.rounded) {
      roundRect(ctx, b, b, w - 2 * b, h - 2 * b, h / 20);
    } else {
      ctx.rect(b, b, w - 2 * b, h - 2 * b);
    }
    ctx.clip();
  }

  timer.step('border');
  var temp: Canvas | Image = background;
  if (options.card?.blur) {
    var blurred = createCanvas(w, h),
      blur_ctx = blurred.getContext('2d') as ctx2D;
    blur_ctx.drawImage(background, backXOff, backYOff, w, h, 0, 0, w, h);
    //blur_ctx.drawImage(background, 0, 0, w, h);

    if (typeof options.card?.blur === 'boolean') options.card.blur = 3;

    blurred = blur(blurred, options.card?.blur);
    //StackBlur.canvasRGBA(blurred as any, 0, 0, blurred.width, blurred.height, options.blur * 3);

    temp = blurred;
  }
  if (options.card?.border) ctx.drawImage(temp, b, b, w - b * 2, h - b * 2);
  else ctx.drawImage(background, backXOff, backYOff, w, h, 0, 0, w, h);

  timer.step('blur');

  snap(canvas);

  //Setting Styles
  ctx.fillStyle = (options.text?.color ?? theme.color).toString(ctx);
  //ctx.strokeStyle = theme.color.toString(ctx);
  ctx.font = '30px ' + (options.text?.font ?? theme.font ?? 'SegoeUI') + ', SegoeUI, SegoeUIEmoji';

  timer.step('text');

  //Avatar Image
  const radius = (h / 2) * (options.avatar?.imageRadius ?? 0.8);

  function applyShape(offset = 0) {
    if (options.avatar?.borderRadius) {
      roundRect(
        ctx,
        h / 2 - radius - offset,
        h / 2 - radius - offset,
        radius * 2 + 2 * offset,
        radius * 2 + 2 * offset,
        options.avatar.borderRadius * radius
      );
    } else {
      ctx.beginPath();
      ctx.arc(h / 2, h / 2, radius + offset, 0, Math.PI * 2, true);
      ctx.closePath();
    }
    return ctx;
  }

  const { avatar } = options;
  if (avatar) {
    const { outlineWidth, outlineColor } = avatar;

    if (outlineWidth) {
      applyShape(-outlineWidth);
      let r = radius;

      ctx.lineWidth = outlineWidth * 1.5;
      ctx.strokeStyle = (outlineColor ?? theme.color ?? '#fff').toString(ctx, h / 2 - r, h / 2 - r, h / 2 + r, h / 2 + r);

      ctx.stroke();
    }
  }

  timer.step('avatar');

  timer.stop();

  if (options.generation?.static) {
    dryMap[options.generation.static] = canvas;
  }

  return canvas;
}
