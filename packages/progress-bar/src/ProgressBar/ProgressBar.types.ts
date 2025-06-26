import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export const Variant = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

export const FormatValueType = {
  fraction: 'fraction',
  percentage: 'percentage',
  number: 'number',
} as const;

export type FormatValueType =
  | (typeof FormatValueType)[keyof typeof FormatValueType]
  | ((value: number, maxValue?: number) => string);

interface BaseProgressBarProps extends DarkModeProps {
  /** Optional color theme. */
  variant?: Variant;

  /** Optional label text displayed directly above the progress bar. */
  label?: React.ReactNode;

  /** Optional size (thickness) of the progress bar. */
  size?: Size;

  /** Optional descriptive text below the progress bar. */
  description?: React.ReactNode;

  /** Optional formatting of progress value text. If not defined, progress value is not displayed. */
  formatValue?: FormatValueType;

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
