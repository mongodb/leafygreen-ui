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

/**
 * `AnimatedVariant` is a constrained subset of `Variant` permitted in animated contexts.
 * Strictly ensures only animation-safe variants can be passed into props when animation logic exists.
 */
export const AnimatedVariant = {
  Info: Variant.Info,
  Success: Variant.Success,
} as const;
export type AnimatedVariant =
  (typeof AnimatedVariant)[keyof typeof AnimatedVariant];

/**
 * `Role` defines valid ARIA role values for the progress bar.
 * Passed directly to the `role` attribute to ensure accessibility.
 */
export const Role = {
  Meter: 'meter',
  Progress: 'progressbar',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

type InheritedProps = DarkModeProps &
  AriaLabelPropsWithLabel &
  LgIdProps &
  Omit<React.ComponentProps<'div'>, 'children' | 'role'>;

type BaseProps = InheritedProps & {
  /** Optional size (thickness) of the progress bar. */
  size?: Size;

  /** Optional descriptive text below the progress bar.
   * If multiple items are provided in an array, they will be automatically rotated every 2000 milliseconds.
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
  /** When `true`, shows an infinite looping animation along the bar instead of a specific width. Only available for `info` and `success` variants. */
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
  role?: typeof Role.Progress;

  /** Optional variant of the progress bar. Defaults to "info". */
  variant?: Variant;

  /** When `true`, enables shimmer animation for longer-running processes. Only available for determinate bars with role "progressbar". Only available for `info` and `success` variants. */
  enableAnimation?: false;
}

interface DeterminateAnimatedProgressProps {
  /** Specify role of the progress bar ("progressbar" or "meter"). Defaults to "progressbar". */
  role?: typeof Role.Progress;

  /** Optional variant of the progress bar. Defaults to "info". */
  variant?: AnimatedVariant;

  /** When `true`, enables shimmer animation for longer-running processes. Only available for determinate bars with role "progressbar". Only available for `info` and `success` variants. */
  enableAnimation: true;
}

type DeterminateProgressProps =
  | DeterminatePlainProgressProps
  | DeterminateAnimatedProgressProps;

interface DeterminateMeterProps {
  /** Role type of the progress bar ("progressbar" or "meter"). */
  role: typeof Role.Meter;

  /** Optional variant of the progress bar. Defaults to "info". */
  variant?: Variant;
}

type DeterminateProps = BaseDeterminateProps &
  (DeterminateMeterProps | DeterminateProgressProps);

interface IndeterminateProps {
  /** When `true`, shows an infinite looping animation along the bar instead of a specific width. Only available for `info` and `success` variants. */
  isIndeterminate: true;

  /** Current progress value. Optional only if isIndeterminate is `true`. */
  value?: number;

  /** Optional variant of the progress bar. Defaults to "info". */
  variant?: AnimatedVariant;
}

export type ProgressBarProps = BaseProps &
  (DeterminateProps | IndeterminateProps);

/**
 * Internal enum-like type representing resolved animation state,
 * derived from props like `isIndeterminate`, `enableAnimation`, and `role`.
 *
 * Centralizes animation logic to avoid repeated condition checks in rendering.
 */
export const AnimationMode = {
  Indeterminate: 'indeterminate',
  DeterminatePlain: 'determinate-plain',
  DeterminateAnimated: 'determinate-animated',
  Transition: 'indeterminate-to-determinate-transition',
} as const;
export type AnimationMode = (typeof AnimationMode)[keyof typeof AnimationMode];

/**
 * Internal flattened type representing all resolved props for rendering.
 */
export type ResolvedProgressBarProps = InheritedProps & {
  /** Resolved role of the progress bar ("progressbar" or "meter"). */
  role: Role;

  /** Resolved current progress value. */
  value: number | undefined;

  /** Resolved maximum progress value. */
  maxValue: number | undefined;

  /** When `true`, shows a disabled style and pauses animation. */
  disabled: boolean;

  /** When `true`, shows an infinite looping animation along the bar instead of a specific width. */
  isIndeterminate: boolean;

  /** When `true`, enables shimmer animation for longer-running processes. Only available for determinate bars with role "progressbar". */
  enableAnimation: boolean;

  /** Resolved size (thickness) of the progress bar. */
  size: Size;

  /** Optional descriptive text below the progress bar.
   * If multiple items are provided in an array, they will be automatically rotated every 2000 milliseconds.
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
  showIcon: boolean;

  /** Resolved variant of the progress bar. Defaults to "info". */
  variant: Variant;
};
