import React from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

export const LoadingSpinnerSize = {
  ...Size,
  XLarge: 'xlarge',
} as const;
export type LoadingSpinnerSize =
  (typeof LoadingSpinnerSize)[keyof typeof LoadingSpinnerSize];

export interface LoadingSpinnerProps
  extends DarkModeProps,
    LgIdProps,
    React.ComponentProps<'svg'> {
  /**
   * Provide a standard `Size` enum, or a custom number in px.
   */
  size?: LoadingSpinnerSize | number;

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
