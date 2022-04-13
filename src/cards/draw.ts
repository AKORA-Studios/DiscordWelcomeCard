import { Timer, toImage, roundRect, ctx2D, changeFontSize, getFontSize, blur } from '@discord-card/core';
import { createCanvas, Image, Canvas } from 'canvas';
import { readFile } from 'fs/promises';
import { themes, snap } from '../lib';
import { CardOptions } from '../types';

export async function drawCard(options: CardOptions): Promise<Buffer> {
  const timer = new Timer('Drawcard').start();
  /*
    const timer = {
       step: (...args: any[]) => {},
      stop: (...args: any[]) => {},
    };
    */

  const w = 700,
    h = 250;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  timer.step('created Canvas');

  //@ts-ignore
  let theme: Theme;
  let background: Image;

  options.border ??= true;
  options.rounded ??= true;

  //Parsing the Theme
  if (typeof (options.theme ?? 'code') === 'string') {
    theme = themes[options.theme ?? 'code'];
    if (!theme) throw new Error('Invalid theme, use: ' + Object.keys(themes).join(' | '));

    background = await toImage(await readFile(theme.image as string));
  } else throw new Error('Invalid theme, use: ' + Object.keys(themes).join(' | '));

  if (options.background) background = await toImage(options.background, 'Background');

  timer.step('loaded Background');

  /** Border width */
  const b = 10; //Border

  //Background
  snap(canvas);
  if (options.rounded) {
    roundRect(ctx, 0, 0, w, h, h / 15);
    ctx.clip();
  }

  if (options.border) {
    ctx.drawImage(background, 0, 0, w, h);

    //darken the borders
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    //StackBlur.canvasRGBA(ctx.canvas as any, 0, 0, w, h, 9);
    blur(ctx, 3);

    if (options.rounded) {
      roundRect(ctx, b, b, w - 2 * b, h - 2 * b, h / 20);
    } else {
      ctx.rect(b, b, w - 2 * b, h - 2 * b);
    }
    ctx.clip();
  }

  timer.step('border');

  var temp: Canvas | Image = background;
  if (options.blur) {
    var blurred = createCanvas(w, h),
      blur_ctx = blurred.getContext('2d') as ctx2D;
    blur_ctx.drawImage(background, 0, 0, w, h);

    if (typeof options.blur === 'boolean') options.blur = 3;

    blur(blur_ctx, options.blur);
    //StackBlur.canvasRGBA(blurred as any, 0, 0, blurred.width, blurred.height, options.blur * 3);

    temp = blurred;
  }
  if (options.border) ctx.drawImage(temp, b, b, w - b * 2, h - b * 2);
  else ctx.drawImage(temp, 0, 0, w, h);

  timer.step('blur');

  snap(canvas);

  //Setting Styles
  ctx.fillStyle = (options.text?.color ?? theme.color).toString(ctx);
  //ctx.strokeStyle = theme.color.toString(ctx);
  ctx.font = '30px ' + (options.text?.font ?? theme.font ?? 'SegoeUI') + ', SegoeUI, SegoeUIEmoji';

  //Drawing
  //Title
  if (options.text?.title) {
    const txt = options.text!.title;
    if (typeof txt === 'string') {
      changeFontSize(ctx, '30px').fillText(txt, w / 2.7, h / 3.5);
    } else txt.draw(ctx); //instanceof Text
  }

  //Text
  if (options.text?.text) {
    const txt = options.text!.text;
    if (typeof txt === 'string') {
      changeFontSize(ctx, getFontSize(txt) + 'px').fillText(txt, w / 2.7, h / 1.8);
    } else txt.draw(ctx); //instanceof Text
  }

  //Subtitle
  if (options.text?.subtitle) {
    const txt = options.text!.subtitle;
    if (typeof txt === 'string') {
      changeFontSize(ctx, '25px').fillText(txt, w / 2.7, h / 1.3);
    } else txt.draw(ctx); //instanceof Text
  }

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
    const { image: avatarImage, outlineWidth, outlineColor } = avatar;
    if (avatarImage) {
      applyShape(-5).clip();
      ctx.drawImage(
        await toImage(avatarImage),
        h / 2 - radius + (avatar.outlineWidth ?? 0), //x
        h / 2 - radius + (avatar.outlineWidth ?? 0), //y
        radius * 2 - (avatar.outlineWidth ?? 0) * 2, //width
        radius * 2 - (avatar.outlineWidth ?? 0) * 2 //height
      );
    }

    if (outlineWidth) {
      applyShape(-outlineWidth / 2);
      let r = radius;

      ctx.lineWidth = outlineWidth;
      ctx.strokeStyle = (outlineColor ?? theme.color ?? '#fff').toString(ctx, h / 2 - r, h / 2 - r, h / 2 + r, h / 2 + r);

      ctx.stroke();
    }
  }

  timer.step('avatar');

  snap(canvas);

  const buff = canvas.toBuffer('image/png');

  timer.step('buffer');
  timer.stop();

  return buff;
}
