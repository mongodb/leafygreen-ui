import React from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

export const SpinnerSize = {
  ...Size,
  XLarge: 'xlarge',
} as const;
export type SpinnerSize = (typeof SpinnerSize)[keyof typeof SpinnerSize];

export interface SpinnerProps
  extends DarkModeProps,
    LgIdProps,
    React.ComponentProps<'svg'> {
  /**
   * Provide a standard `Size` enum, or a custom number in px.
   */
  size?: SpinnerSize | number;

  /**
   * An override for the spinner animation’s color.
   * Intended for internal use.
   * @internal
   */
  colorOverride?: string;

  /**
   * Disables the spinner animation for testing
   * @internal
   */
  disableAnimation?: boolean;
}
