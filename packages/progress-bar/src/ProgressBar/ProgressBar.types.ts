import React from 'react';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { DarkModeProps } from '@leafygreen-ui/lib';

export const Type = {
  Meter: 'meter',
  Loader: 'loader',
} as const;
export type Type = (typeof Type)[keyof typeof Type];

export const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;
export type Size = (typeof Size)[keyof typeof Size];

export const FormatValueType = {
  fraction: 'fraction',
  percentage: 'percentage',
  number: 'number',
} as const;

export type FormatValueType =
  | (typeof FormatValueType)[keyof typeof FormatValueType]
  | ((value: number, maxValue?: number) => string);

export const MeterStatus = {
  Healthy: 'healthy',
  Warning: 'warning',
  Danger: 'danger',
} as const;
export type MeterStatus = (typeof MeterStatus)[keyof typeof MeterStatus];

export const LoaderVariant = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
} as const;
export type LoaderVariant = (typeof LoaderVariant)[keyof typeof LoaderVariant];

export const AnimatedLoaderVariant = {
  Info: LoaderVariant.Info,
  Success: LoaderVariant.Success,
} as const;
export type AnimatedLoaderVariant =
  (typeof AnimatedLoaderVariant)[keyof typeof AnimatedLoaderVariant];

export const Color = {
  Blue: 'blue',
  Green: 'green',
  Yellow: 'yellow',
  Red: 'red',
} as const;
export type Color = (typeof Color)[keyof typeof Color];

type BaseProps = DarkModeProps &
  AriaLabelPropsWithLabel & {
    /** Optional size (thickness) of the progress bar. */
    size?: Size;

    /** Optional descriptive text below the progress bar. */
    description?: React.ReactNode;

    /** Optional formatting of progress value text. If not defined, progress value is not displayed. */
    formatValue?: FormatValueType;

    /**
     * If true, displays icon next to progress value.
     * If `variant` is `'success'` or `status` is `'healthy'`, the icon only appears when progress reaches 100%.
     */
    showIcon?: boolean;
  };

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

interface DeterminatePlainLoaderProps {
  /** Variant for loader type. Animation is only available for `info` or `success` variants. */
  variant?: LoaderVariant;

  /** When `true`, enables shimmer animation for long-running processes. Not available for meters or if `isIndeterminate` is `true` for loaders. */
  enableAnimation?: false;
}

interface DeterminateAnimatedLoaderProps {
  /** Variant for loader type. Animation is only available for `info` or `success` variants. */
  variant?: AnimatedLoaderVariant;

  /** When `true`, enables shimmer animation for long-running processes. Not available for meters or if `isIndeterminate` is `true` for loaders. */
  enableAnimation: true;
}

type DeterminateLoaderProps = BaseDeterminateLoaderProps &
  (DeterminatePlainLoaderProps | DeterminateAnimatedLoaderProps);

interface IndeterminateLoaderProps {
  /** When `true`, shows an infinite looping animation along the bar. */
  isIndeterminate: true;

  /** Current progress value. Optional only if `isIndeterminate` is `true` for a loader type. */
  value?: number;

  /** Variant for loader type. Animation is only available for `info` or `success` variants. */
  variant?: AnimatedLoaderVariant;
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

  /** Status for meter type indicating health state. */
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

  /** Color displayed for status or variant. Animation is only available for `blue` or `green` colors. */
  color: Color;

  /** When `true`, shows an infinite looping animation along the bar. */
  isIndeterminate: boolean;

  /** When `true`, enables shimmer animation for long-running processes. Not available for meters or if `isIndeterminate` is `true` for loaders. */
  enableAnimation: boolean;
}

export const AnimationMode = {
  DeterminateBase: 'determinate-base',
  DeterminateAnimated: 'determinate-animated',
  Indeterminate: 'indeterminate',
  Transition: 'indeterminate-to-determinate-transition',
};
export type AnimationMode = (typeof AnimationMode)[keyof typeof AnimationMode];
