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

interface BaseDeterminateLoaderProps {
  isIndeterminate?: false;
  value: number;
  maxValue?: number;
  disabled?: boolean;
}

interface PlainDeterminateLoaderProps {
  variant?: Variant;
  enableAnimation?: false;
}

interface AnimatedDeterminateLoaderProps {
  variant?: AnimatedVariant;
  enableAnimation: true;
}

type DeterminateLoaderProps = BaseDeterminateLoaderProps &
  (PlainDeterminateLoaderProps | AnimatedDeterminateLoaderProps);
interface BaseLoaderProps {
  type: typeof Type.Loader;
}
interface IndeterminateLoaderProps {
  isIndeterminate: true;
  value?: number;
  variant?: typeof Variant.Info | typeof Variant.Success;
}

type LoaderProps = BaseLoaderProps &
  (DeterminateLoaderProps | IndeterminateLoaderProps);

interface MeterProps {
  type: typeof Type.Meter;
  value: number;
  maxValue?: number;
  disabled?: boolean;
  status?: MeterStatus;
}

export type ProgressBarProps = BaseProps & (MeterProps | LoaderProps);
