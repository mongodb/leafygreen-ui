import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export const Type = {
  Meter: 'meter',
  Loader: 'loader',
} as const;

export const MeterStatus = {
  Healthy: 'healthy',
  Warning: 'warning',
  Error: 'error',
} as const;
export type MeterStatus = (typeof MeterStatus)[keyof typeof MeterStatus];

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
export type AnimatedVariant = Exclude<Variant, 'warning' | 'error'>;

export const FormatValueType = {
  fraction: 'fraction',
  percentage: 'percentage',
  number: 'number',
} as const;

export type FormatValueType =
  | (typeof FormatValueType)[keyof typeof FormatValueType]
  | ((value: number, maxValue?: number) => string);

interface BaseProps extends DarkModeProps {
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

interface BaseLoaderProps {
  /** Specifies whether the progress bar is a meter or loader. */
  type: typeof Type.Loader;
}
interface BaseDeterminateLoaderProps {
  /** When `true`, shows an infinite looping animation along the bar. */
  isIndeterminate?: false;

  /** Current progress value. Optional only if `isIndeterminate` is `true` for a loader type. */
  value: number;

  /** Optional maximum progress value. Not available if `isIndeterminate` is `true` for loaders. */
  maxValue?: number;

  /** Pauses progress and shows a disabled style. Not available if `isIndeterminate` is `true` for loaders. */
  disabled?: boolean;
}

interface PlainDeterminateLoaderProps {
  /** Color variant for loader type. Animation is only available for `info` or `success` variants. */
  variant?: Variant;

  /** When `true`, enables shimmer animation for long-running processes. Not available for meters or if `isIndeterminate` is `true` for loaders. */
  enableAnimation?: false;
}

interface AnimatedDeterminateLoaderProps {
  /** Color variant for loader type. Animation is only available for `info` or `success` variants. */
  variant?: AnimatedVariant;

  /** When `true`, enables shimmer animation for long-running processes. Not available for meters or if `isIndeterminate` is `true` for loaders. */
  enableAnimation: true;
}

type DeterminateLoaderProps = BaseDeterminateLoaderProps &
  (PlainDeterminateLoaderProps | AnimatedDeterminateLoaderProps);

interface IndeterminateLoaderProps {
  /** When `true`, shows an infinite looping animation along the bar. */
  isIndeterminate: true;

  /** Current progress value. Optional only if `isIndeterminate` is `true` for a loader type. */
  value?: number;

  /** Color variant for loader type. Animation is only available for `info` or `success` variants. */
  variant?: typeof Variant.Info | typeof Variant.Success;
}

type LoaderProps = BaseLoaderProps &
  (DeterminateLoaderProps | IndeterminateLoaderProps);

interface MeterProps {
  /** Specifies whether the progress bar is a meter or loader. */
  type: typeof Type.Meter;

  /** Current progress value. Optional only if `isIndeterminate` is `true` for a loader type. */
  value: number;

  /** Optional maximum progress value. Not available if `isIndeterminate` is `true` for loaders. */
  maxValue?: number;

  /** Pauses progress and shows a disabled style. Not available if `isIndeterminate` is `true` for loaders. */
  disabled?: boolean;

  /** Status color for meter type indicating health or error state. */
  status?: MeterStatus;
}

export type ProgressBarProps = BaseProps & (MeterProps | LoaderProps);

export interface ResolvedProgressBarProps {
  /** Current progress value. Optional only if `isIndeterminate` is `true` for a loader type. */
  value: number | undefined;

  /** Optional maximum progress value. Not available if `isIndeterminate` is `true` for loaders. */
  maxValue: number | undefined;

  /** Pauses progress and shows a disabled style. Not available if `isIndeterminate` is `true` for loaders. */
  disabled: boolean;

  /** Color variant for loader type. Animation is only available for `info` or `success` variants. */
  variant: Variant;

  /** When `true`, shows an infinite looping animation along the bar. */
  isDeterminate: boolean;

  /** When `true`, enables shimmer animation for long-running processes. Not available for meters or if `isIndeterminate` is `true` for loaders. */
  enableAnimation: boolean;
}
