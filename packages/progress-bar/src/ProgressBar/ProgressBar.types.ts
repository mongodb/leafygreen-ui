import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';
import { Size, Variant } from '@leafygreen-ui/tokens';

export const ProgressBarSize = {
  small: Size.Small,
  default: Size.Default,
  large: Size.Large,
} as const;

export type ProgressBarSize =
  (typeof ProgressBarSize)[keyof typeof ProgressBarSize];

export const ProgressBarVariant = {
  info: Variant.Info,
  success: Variant.Success,
  warning: Variant.Warning,
  error: Variant.Error,
} as const;

export type ProgressBarVariant =
  (typeof ProgressBarVariant)[keyof typeof ProgressBarVariant];

export const ProgressBarValueType = {
  fraction: 'fraction',
  percentage: 'percentage',
  number: 'number',
} as const;

export type ProgressBarValueType =
  | (typeof ProgressBarValueType)[keyof typeof ProgressBarValueType]
  | ((value: number, maxValue?: number) => string);

interface BaseProgressBarProps extends DarkModeProps {
  /** Optional color theme. */
  variant?: ProgressBarVariant;

  /** Optional label text displayed directly above the progress bar. */
  label?: React.ReactNode;

  /** Optional size (thickness) of the progress bar. */
  size?: ProgressBarSize;

  /** Optional descriptive text below the progress bar. */
  description?: React.ReactNode;

  /** Optional formatting of progress value text. If not defined, progress value is not displayed. */
  formatValue?: ProgressBarValueType;

  /**
   * If true, displays icon next to progress value.
   * If `variant` is `'success'`, the icon only appears when progress reaches 100%.
   */
  showIcon?: boolean;
}

interface DeterminateProgressBarProps {
  /**
   * Enables indeterminate mode.
   * When `true`, progress appears as an infinite looping animation.
   */
  isIndeterminate: false;

  /**
   * Current progress value.
   * Optional **only** if `isIndeterminate` is true.
   */
  value: number;

  /** Optional total progress value. */
  maxValue?: number;

  /** If true, enables shimmer animation to indicate progression for longer-running tasks. */
  enableAnimation?: boolean;

  /** If true, pauses the progress bar and renders it in a gray color. */
  disabled?: boolean;
}
interface IndeterminateProgressBarProps {
  /**
   * Enables indeterminate mode.
   * When `true`, progress appears as an infinite looping animation.
   */
  isIndeterminate: true;

  /**
   * Current progress value.
   * Optional **only** if `isIndeterminate` is true.
   */
  value?: number;
}

/**
 * Props for the `ProgressBar` component.
 * Use `isIndeterminate: true` for indeterminate mode, or `false` for determinate.
 */
export type ProgressBarProps = BaseProgressBarProps &
  (DeterminateProgressBarProps | IndeterminateProgressBarProps);
