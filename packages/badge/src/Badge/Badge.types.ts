import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface BadgeProps extends React.ComponentProps<'div'>, DarkModeProps {
  /**
   * An additional className to add to the component's classList
   */
  className?: string;

  /**
   * The content to render within the badge
   */
  children?: React.ReactNode;

  /**
   * The Badge's style variant
   *
   * @default 'lightgray'
   */
  variant?: Variant;
}

export const Variant = {
  DarkGray: 'darkgray',
  LightGray: 'lightgray',
  Red: 'red',
  Yellow: 'yellow',
  Blue: 'blue',
  Green: 'green',
  Purple: 'purple',
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];
