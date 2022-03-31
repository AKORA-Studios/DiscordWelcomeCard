import { createCanvas, loadImage, CanvasRenderingContext2D as ctx2D, Canvas, Image } from 'canvas';
import { Theme } from '@discord-card/core';
import { toImage, getFontSize, snap, themes } from './lib';
import { CardOptions, GuildMemberLike } from './types';
import '@discord-card/core'; //To polyfill canvas class and load font

export async function drawCard(options: CardOptions): Promise<Buffer> {
  const w = 700,
    h = 250;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.w = ctx.width = w;
  ctx.h = ctx.height = h;

  //@ts-ignore
  let theme: Theme;
  let background: Image;

  options.border ??= true;
  options.rounded ??= true;

  //Parsing the Theme
  if (typeof (options.theme ?? 'code') === 'string') {
    theme = themes[options.theme ?? 'code'];
    if (!theme) throw new Error('Invalid theme, use: ' + Object.keys(themes).join(' | '));

    background = await loadImage(theme.image);
  } else throw new Error('Invalid theme, use: ' + Object.keys(themes).join(' | '));

  if (options.background) background = await toImage(options.background, 'Background');

  ctx.theme = theme;
  /** Border width */
  const b = 10; //Border

  //Background
  snap(canvas);
  if (options.rounded) ctx.roundRect(0, 0, w, h, h / 15);
  else ctx.rect(0, 0, w, h);
  ctx.clip();

  if (options.border) {
    ctx.drawImage(background, 0, 0, w, h);
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    ctx.blur(3);
  }

  snap(canvas);
  //Rounded Edges
  if (options.border) {
    if (options.rounded) {
      ctx.roundRect(b, b, w - 2 * b, h - 2 * b, h / 20);
    } else {
      ctx.rect(b, b, w - 2 * b, h - 2 * b);
    }
    ctx.clip();
  } else {
    if (options.rounded) ctx.roundRect(0, 0, w, h, h / 15).clip();
    else ctx.rect(0, 0, w, h);
  }

  var temp: Canvas | Image = background;
  if (options.blur) {
    var blur = createCanvas(w, h),
      blur_ctx = blur.getContext('2d') as ctx2D;
    blur_ctx.drawImage(background, 0, 0, w, h);

    if (typeof options.blur === 'boolean') blur_ctx.blur(3);
    else blur_ctx.blur(options.blur);

    temp = blur;
  }
  if (options.border) ctx.drawImage(temp, b, b, w - b * 2, h - b * 2);
  else ctx.drawImage(temp, 0, 0, w, h);

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
      ctx.changeFontSize('30px').fillText(txt, ctx.width / 2.7, ctx.height / 3.5);
    } else txt.draw(ctx); //instanceof Text
  }

  //Text
  if (options.text?.text) {
    const txt = options.text!.text;
    if (typeof txt === 'string') {
      ctx.changeFontSize(getFontSize(txt) + 'px').fillText(txt, ctx.width / 2.7, ctx.height / 1.8);
    } else txt.draw(ctx); //instanceof Text
  }

  //Subtitle
  if (options.text?.subtitle) {
    const txt = options.text!.subtitle;
    if (typeof txt === 'string') {
      ctx.changeFontSize('25px').fillText(txt, ctx.width / 2.7, ctx.height / 1.3);
    } else txt.draw(ctx); //instanceof Text
  }

  //Avatar Image
  const radius = (h / 2) * (options.avatar?.imageRadius ?? 0.8);

  function applyShape(offset = 0) {
    if (options.avatar?.borderRadius) {
      ctx.roundRect(
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
      ctx.strokeStyle = (outlineColor ?? theme.color ?? '#fff').toString(ctx, ctx.h / 2 - r, h / 2 - r, h / 2 + r, h / 2 + r);

      ctx.stroke();
    }
  }

  snap(canvas);

  return canvas.toBuffer('image/png');
}

export async function welcomeImage(member: GuildMemberLike, options: CardOptions = {}): Promise<Buffer> {
  const opts = { ...options };
  opts.text ??= {};
  opts.avatar ??= {};

  opts.text.title ??= `Welcome to this server,`;
  opts.text.text ??= `${member.user.tag}!`;
  opts.text.subtitle ??= `MemberCount: ${member.guild.memberCount}`;
  opts.avatar.image ??= await loadImage(member.user.displayAvatarURL({ format: 'png' }));

  return await drawCard(opts);
}

export async function goodbyeImage(member: GuildMemberLike, options: CardOptions = {}): Promise<Buffer> {
  const opts = { ...options };
  opts.text ??= {};
  opts.avatar ??= {};

  opts.text.title ??= `Goodbye,`;
  opts.text.text ??= `${member.user.tag}!`;
  opts.avatar.image ??= await loadImage(member.user.displayAvatarURL({ format: 'png' }));

  return await drawCard(opts);
}

export { themes, Text } from './lib';
export { CardOptions, Color, GuildMemberLike, ImageResolvable } from './types';
export * from '@discord-card/core';
