import { ComponentProps } from 'react';

import { DarkModeProps, Theme } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

export const Format = {
  /** Renders a MongoDB logo mark */
  MongoDB: 'mongodb',

  /** Renders the user's given name initial */
  GivenInitial: 'given-initial',

  /** Renders with the user's combined given + surname initials  */
  Initials: 'initials',

  /** Renders a `Person` icon */
  Default: 'default',

  /** Renders a `Government` icon */
  Government: 'government',

  // TODO: Image avatar format
  // /** Renders the provided image */
  // Image: 'image',
};
export type Format = (typeof Format)[keyof typeof Format];

export interface AvatarProps extends ComponentProps<'div'>, DarkModeProps {
  format: Format;
  size: Size;
  imageUrl?: string;
}

export interface AvatarStyleArgs {
  size: Size;
  theme: Theme;
  format: Format;
}
