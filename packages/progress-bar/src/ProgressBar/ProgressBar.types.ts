import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export const Type = {
  Meter: 'meter',
  Loader: 'loader',
} as const;

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

interface MeterProps {
  type: typeof Type.Meter;
  value: number;
  maxValue?: number;
  disabled?: boolean;
  status?: 'healthy' | 'warning' | 'error';
}

interface BaseLoaderProps {
  type: typeof Type.Loader;
}

interface DeterminateLoaderProps {
  isIndeterminate: false;
  value: number;
  maxValue?: number;
  disabled?: boolean;
  variant?: Variant;
  enableAnimation?: boolean;
}

interface IndeterminateLoaderProps {
  isIndeterminate: true;
  value?: number;
  variant?: typeof Variant.Info | typeof Variant.Success;
}

type LoaderProps = BaseLoaderProps &
  (DeterminateLoaderProps | IndeterminateLoaderProps);

export type ProgressBarProps = BaseProps & (MeterProps | LoaderProps);
