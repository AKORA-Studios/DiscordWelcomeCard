import { Text, ImageResolvable, ColorResolvable } from '@discord-card/core';
import { themes } from './lib';
type mimeType = 'image/png' | 'image/jpeg' | 'application/pdf' | 'raw';

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
    color?: ColorResolvable;
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
    outlineColor?: ColorResolvable;
    /** Border radius of the avatar between 0.0 and 1.0
     *  (0 = rect. 1 = circle)
     * @default 1.0 */
    borderRadius?: number;
    /** Radius to control the size of the avatar
     *  the value is multiplied with the height/2
     *  of the canvas, so 1.0 fills the entire height
     *  @default 0.8 */
    imageRadius?: number;
  };
  card?: {
    /** Override the Background, can be a URL/Canvas/Image or Buffer  */ background?: ImageResolvable;
    /** If the background should be blurred (true -> 3) */
    blur?: boolean | number;
    /** When enabled a blurred border is drawn, enabled by default */
    border?: boolean | number;
    /** If enabled the edges will be rounded, enabled by default */
    rounded?: boolean | number;
    //custom?: ModuleFunction;
  };
  generation?: {
    /** Add name to this card, this will save the card
     * renderd without text and image, to speed up the generation
     * by only updating dynamic content */
    static?: string;
    /** Image Format, by default it's PNG */
    format?: mimeType;
  };
};
