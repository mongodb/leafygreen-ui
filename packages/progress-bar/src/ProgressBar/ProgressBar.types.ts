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

interface BaseDeterminateProps {
  isIndeterminate?: false;
  value: number;
  maxValue?: number;
  disabled?: boolean;
}

interface BaseDeterminateProgressProps {
  roleType?: typeof Role.Progress;
}

interface DeterminatePlainProgressProps {
  variant?: Variant;
  enableAnimation?: false;
}

interface DeterminateAnimatedProgressProps {
  variant?: AnimatedVariant;
  enableAnimation: true;
}

type DeterminateProgressProps = BaseDeterminateProgressProps &
  (DeterminatePlainProgressProps | DeterminateAnimatedProgressProps);

interface DeterminateMeterProps {
  roleType: typeof Role.Meter;
  variant?: Variant;
}

type DeterminateProps = BaseDeterminateProps &
  (DeterminateMeterProps | DeterminateProgressProps);

interface IndeterminateProps {
  isIndeterminate: true;
  value?: number;
  variant?: AnimatedVariant;
}

export type ProgressBarProps = BaseProps &
  (DeterminateProps | IndeterminateProps);

export interface ResolvedProgressBarProps {
  /** Current progress value. Optional only if `isIndeterminate` is `true` for a loader type. */
  value: number | undefined;

  /** Optional maximum progress value. Not available if `isIndeterminate` is `true` for loaders. */
  maxValue: number | undefined;

  /** Pauses progress and shows a disabled style. Not available if `isIndeterminate` is `true` for loaders. */
  disabled: boolean;

  /** When `true`, shows an infinite looping animation along the bar. */
  isIndeterminate: boolean;

  /** When `true`, enables shimmer animation for long-running processes. Not available for meters or if `isIndeterminate` is `true` for loaders. */
  enableAnimation: boolean;

  role: Role;
}

export const AnimationMode = {
  DeterminatePlain: 'determinate-plain',
  DeterminateAnimated: 'determinate-animated',
  Indeterminate: 'indeterminate',
  Transition: 'indeterminate-to-determinate-transition',
};
export type AnimationMode = (typeof AnimationMode)[keyof typeof AnimationMode];
