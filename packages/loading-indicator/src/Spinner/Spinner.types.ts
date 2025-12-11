import React from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

/**
 * Determines the position of the description text relative to the spinner
 */
export const SpinnerDirection = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
} as const;

export type SpinnerDirection =
  (typeof SpinnerDirection)[keyof typeof SpinnerDirection];

export interface SpinnerProps
  extends DarkModeProps,
    LgIdProps,
    React.ComponentProps<'div'> {
  /**
   * Provide a standard `Size` enum, or a custom number in px.
   */
  size?: Size | number;

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

  /**
   * Description text to display alongside the spinner.
   * Can be a string or ReactNode for more flexibility.
   */
  description?: React.ReactNode;

  /**
   * Determines the position of the description text relative to the spinner.
   * - `vertical`: Description appears below the spinner
   * - `horizontal`: Description appears to the right of the spinner
   *
   * @default 'vertical'
   */
  direction?: SpinnerDirection;

  /**
   * The base font size of the description text.
   */
  baseFontSize?: BaseFontSize;

  /**
   * Props to pass through to the SVG element
   */
  svgProps?: React.ComponentProps<'svg'>;
}
