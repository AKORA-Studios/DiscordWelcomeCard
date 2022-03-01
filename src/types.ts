import { Gradient } from '@discord-card/core';
import { Canvas, CanvasGradient, CanvasPattern, Image } from 'canvas';
import { Text, themes } from './lib';

export interface GuildMemberLike {
  user: {
    tag: string;
    displayAvatarURL(options?: { dynamic?: boolean; format?: 'gif' | 'webp' | 'png' | 'jpg' | 'jpeg' }): string;
  };
  guild: {
    memberCount: number;
  };
}

export type Color = `#${string}` | Gradient;
export type ImageResolvable = Canvas | Image | Buffer | string;

export type Style = string | CanvasGradient | CanvasPattern;

export type CardOptions = {
  /** Select a theme with some default options */
  theme?: keyof typeof themes;
  /** Options for the text on the card */
  text?: {
    /** Text in the Top */
    title?: string | Text;
    /**Text in the middle(big) */
    text?: string | Text;
    /** Text on the bottom */
    subtitle?: string | Text;
    /** Font Color */
    color?: Color;
    /** Custom Font */
    font?: string;
  };
  /** Options for the avatar */
  avatar?: {
    /** The Avatar Image, can be a URL/Canvas/Image or Buffer */
    image?: ImageResolvable;
    /** Width of the outline around the avatar */
    outlineWidth?: number;
    /** Color of the outline */
    outlineColor?: Color;
  };
  /** Override the Background, can be a URL/Canvas/Image or Buffer  */
  background?: ImageResolvable;
  /** If the background should be blurred (true -> 3) */
  blur?: boolean | number;
  /** When enabled a blurred border is drawn, enabled by default */
  border?: boolean;
  /** If enabled the edges will be rounded, enabled by default */
  rounded?: boolean;
  //custom?: ModuleFunction;
};
