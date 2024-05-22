import { ComponentProps } from 'react';
import omit from 'lodash/omit';

import { GlyphName } from '@leafygreen-ui/icon';
import { DarkModeProps, Theme } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

export const Format = {
  /** Renders a MongoDB logo mark */
  MongoDB: 'mongodb',

  /** Renders the user's given name initial */
  Text: 'text',

  /** Renders a `Person` icon */
  Icon: 'icon',

  /** TODO: Renders an image avatar */
  // Image: 'image',
} as const;
export type Format = (typeof Format)[keyof typeof Format];

export const AvatarSize = {
  ...omit(Size, ['XSmall', 'Small']),
  XLarge: 'xlarge',
} as const;
export type AvatarSize = (typeof AvatarSize)[keyof typeof AvatarSize];

export interface BaseAvatarProps extends ComponentProps<'div'>, DarkModeProps {
  /**
   * The relative Size of tha Avatar
   *
   * @default `'default'`
   */
  size?: AvatarSize;

  /**
   * Renders the Avatar at a specific pixel size, not supported by the {@link AvatarSize} map
   */
  sizeOverride?: number;
}

export type DiscriminatedAvatarProps =
  | {
      /**
       * The format of the avatar. Can be one of `mongodb`, `text`, or `icon`.
       *
       * @default `"icon"`
       */
      format: typeof Format.MongoDB;

      /**
       * The text to render in the Avatar when `format === 'text'`
       */
      text?: string;

      /**
       * The LeafyGreen icon glyph name to render in the Avatar when `format === 'icon'`
       *
       * @default `"Person"`
       */
      glyph?: GlyphName;
    }
  | {
      /**
       * The format of the avatar. Can be one of `mongodb`, `text`, or `icon`.
       * @default `"icon"`
       */
      format: typeof Format.Text;

      /**
       * The text to render in the Avatar when `format === 'text'`
       */
      text: string;

      /**
       * The LeafyGreen icon glyph name to render in the Avatar when `format === 'icon'`
       *
       * @default `"Person"`
       */
      glyph?: GlyphName;
    }
  | {
      /**
       * The format of the avatar. Can be one of `mongodb`, `text`, or `icon`.
       * @default `"icon"`
       */
      format: typeof Format.Icon;

      /**
       * The LeafyGreen icon glyph name to render in the Avatar when `format === 'icon'`
       *
       * @default `"Person"`
       */
      glyph: GlyphName;

      /**
       * The text to render in the Avatar when `format === 'text'`
       */
      text?: string;
    };
// TODO: image Avatar
// | {
//     format: typeof Format.Image;
//     imageUrl: string;
//     text: never;
//     glyph: never;
//   };

export type AvatarProps = BaseAvatarProps & DiscriminatedAvatarProps;

export interface AvatarStyleArgs {
  size?: AvatarSize;
  theme?: Theme;
  format?: Format;
  sizeOverride?: number;
}
