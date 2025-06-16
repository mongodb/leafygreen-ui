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

export type ProgressBarValueType = 'fraction' | 'percentage' | 'number';
interface BaseProgressBarProps {
  variant?: ProgressBarVariant;

  /**
   * The descriptive label for the progress bar.
   */
  label?: string;

  /**
   * The format of the value displayed in the progress bar next to the label.
   */
  valueType?: ProgressBarValueType;

  /**
   * The maximum value of the progress bar.
   * If not provided, it defaults to 100.
   */
  maxValue?: number;

  /**
   * The units of the value displayed in the progress bar.
   * If not provided, no units will be displayed.
   */
  valueUnits?: string;

  /**
   * Optional icon displayed next to the value in the progress bar based on the variant.
   * If not provided, no icon will be displayed.
   */
  showIcon?: boolean;

  size?: ProgressBarSize;
  description?: string;
  darkMode?: boolean;
  disabled?: boolean;
}

interface DeterminateProgressBarProps extends BaseProgressBarProps {
  type: 'determinate';
  value: number;
  /**
   * Shimmer animation recommended for long-running tasks to provide visual feedback.
   */
  enableAnimation?: boolean;
}
interface IndeterminateProgressBarProps extends BaseProgressBarProps {
  type: 'indeterminate';
  value?: number;
}

export type ProgressBarProps =
  | DeterminateProgressBarProps
  | IndeterminateProgressBarProps;
