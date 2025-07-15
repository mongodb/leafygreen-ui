import React from 'react';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

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

export const Variant = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];

export const AnimatedVariant = {
  Info: Variant.Info,
  Success: Variant.Success,
} as const;
export type AnimatedVariant =
  (typeof AnimatedVariant)[keyof typeof AnimatedVariant];

export const Role = {
  Meter: 'meter',
  Progress: 'progressbar',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

type BaseProps = DarkModeProps &
  AriaLabelPropsWithLabel &
  LgIdProps & {
    /** Optional size (thickness) of the progress bar. */
    size?: Size;

    /** Optional descriptive text below the progress bar.
     * If multiple items are provided in an array, they will be automatically rotated every 2000 milliseconds (default: 2000 ms).
     * Single items are returned as-is without rotation.
     */
    description?: React.ReactNode | Array<React.ReactNode>;

    /**
     * Optional formatting of progress value text.
     * If undefined, no progress value is displayed.
     */
    formatValue?: FormatValueType;

    /**
     * When `true`, displays icon next to progress value.
     * If `variant` is `'success'`, the icon only appears when progress reaches 100%.
     */
    showIcon?: boolean;
  };

interface BaseDeterminateProps {
  /** When `true`, shows an infinite looping animation along the bar instead of a specific width. */
  isIndeterminate?: false;

  /** Current progress value. Optional only if isIndeterminate is `true`. */
  value: number;

  /** Maximum progress value. */
  maxValue?: number;

  /** When `true`, shows a disabled style and pauses animation. */
  disabled?: boolean;
}
interface DeterminatePlainProgressProps {
  /** Specify role of the progress bar ("progressbar" or "meter"). Defaults to "progressbar". */
  roleType?: typeof Role.Progress;

  /** Optional variant of the progress bar. Defaults to "info". */
  variant?: Variant;

  /** When `true`, enables shimmer animation for longer-running processes. Only available for determinate bars with role "progressbar". */
  enableAnimation?: false;
}

interface DeterminateAnimatedProgressProps {
  /** Specify role of the progress bar ("progressbar" or "meter"). Defaults to "progressbar". */
  roleType?: typeof Role.Progress;

  /** Optional variant of the progress bar. Defaults to "info". */
  variant?: AnimatedVariant;

  /** When `true`, enables shimmer animation for longer-running processes. Only available for determinate bars with role "progressbar". */
  enableAnimation: true;
}

type DeterminateProgressProps =
  | DeterminatePlainProgressProps
  | DeterminateAnimatedProgressProps;

interface DeterminateMeterProps {
  /** Role type of the progress bar ("progressbar" or "meter"). */
  roleType: typeof Role.Meter;

  /** Optional variant of the progress bar. Defaults to "info". */
  variant?: Variant;
}

type DeterminateProps = BaseDeterminateProps &
  (DeterminateMeterProps | DeterminateProgressProps);

interface IndeterminateProps {
  /** When `true`, shows an infinite looping animation along the bar instead of a specific width. */
  isIndeterminate: true;

  /** Current progress value. Optional only if isIndeterminate is `true`. */
  value?: number;

  /** Optional variant of the progress bar. Defaults to "info". */
  variant?: AnimatedVariant;
}

export type ProgressBarProps = BaseProps &
  (DeterminateProps | IndeterminateProps);

export interface ResolvedProgressBarProps {
  /** Resolved role of the progress bar ("progressbar" or "meter"). */
  role: Role;

  /** Current progress value. Optional only if isIndeterminate is `true`. */
  value: number | undefined;

  /** Maximum progress value. */
  maxValue: number | undefined;

  /** When `true`, shows a disabled style and pauses animation. */
  disabled: boolean;

  /** When `true`, shows an infinite looping animation along the bar instead of a specific width. */
  isIndeterminate: boolean;

  /** When `true`, enables shimmer animation for longer-running processes. Only available for determinate bars with role "progressbar". */
  enableAnimation: boolean;
}

export const AnimationMode = {
  Indeterminate: 'indeterminate',
  DeterminatePlain: 'determinate-plain',
  DeterminateAnimated: 'determinate-animated',
  Transition: 'indeterminate-to-determinate-transition',
};
export type AnimationMode = (typeof AnimationMode)[keyof typeof AnimationMode];
