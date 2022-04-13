import { Timer, toImage, roundRect, ctx2D, changeFontSize, getFontSize, blur } from '@discord-card/core';
import { createCanvas, Image, Canvas } from 'canvas';
import { readFile } from 'fs/promises';
import { themes, snap } from '../lib';
import { CardOptions } from '../types';
import { DryOptions, staticCard } from './dry';

export async function drawCard(options: CardOptions & DryOptions): Promise<Buffer> {
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

  options.border ??= true;
  options.rounded ??= true;

  //Parsing the Theme
  if (typeof (options.theme ?? 'code') === 'string') {
    theme = themes[options.theme ?? 'code'];
    if (!theme) throw new Error('Invalid theme, use: ' + Object.keys(themes).join(' | '));
  } else throw new Error('Invalid theme, use: ' + Object.keys(themes).join(' | '));

  ctx.drawImage(await staticCard(options), 0, 0, w, h);

  timer.step('add static');

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
  }

  timer.step('avatar');

  snap(canvas);

  const buff = canvas.toBuffer('image/png');

  timer.step('buffer');
  timer.stop();

  return buff;
}
