import { ComponentProps } from 'react';

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
};
export type Format = (typeof Format)[keyof typeof Format];

export interface BaseAvatarProps extends ComponentProps<'div'>, DarkModeProps {
  size: Size;
}

export type DiscriminatedAvatarProps =
  | {
      format: typeof Format.MongoDB;
      text: never;
      glyph: never;
      // imageUrl: never;
    }
  | {
      format: typeof Format.Text;
      text: string;
      glyph: never;
      // imageUrl: never;
    }
  | {
      format: typeof Format.Icon;
      glyph: GlyphName;
      text: never;
      // imageUrl: never;
    };
// | {
//     format: typeof Format.Image;
//     imageUrl: string;
//     text: never;
//     glyph: never;
//   };

export type AvatarProps = BaseAvatarProps & DiscriminatedAvatarProps;

export interface AvatarStyleArgs {
  size: Size;
  theme: Theme;
  format: Format;
}
