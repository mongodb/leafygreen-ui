import React from 'react';

import { Size, Variant } from '@leafygreen-ui/tokens';

export type ProgressBarSize =
  | typeof Size.Default
  | typeof Size.Large
  | typeof Size.Small;

export type ProgressBarVariant =
  | typeof Variant.Info
  | typeof Variant.Success
  | typeof Variant.Warning
  | typeof Variant.Error;

export type ProgressBarValueType =
  | 'fraction'
  | 'percentage'
  | 'number'
  | ((value: number, maxValue?: number) => string);

interface BaseProgressBarProps {
  variant?: ProgressBarVariant;
  label?: React.ReactNode;
  size?: ProgressBarSize;
  description?: React.ReactNode;
  darkMode?: boolean;
  disabled?: boolean;
}

interface DeterminateProgressBarProps {
  isIndeterminate: false;
  value: number;
  maxValue?: number;

  /**
   * Optional format of value display. If omitted, no value will be displayed.
   */
  formatValue?: ProgressBarValueType;

  /**
   * Optional icon based on variant. Rendered directly right of the value
   */
  showIcon?: boolean;

  /**
   * Shimmer animation recommended for long-running tasks to provide visual feedback.
   */
  enableAnimation?: boolean;
}
interface IndeterminateProgressBarProps {
  isIndeterminate: true;
}

export type ProgressBarProps = BaseProgressBarProps &
  (DeterminateProgressBarProps | IndeterminateProgressBarProps);
