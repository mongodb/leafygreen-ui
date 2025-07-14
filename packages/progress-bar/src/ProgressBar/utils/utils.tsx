import React from 'react';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { isDefined } from '@leafygreen-ui/lib';

import { DEFAULT_MAX_VALUE } from '../constants';
import {
  AnimationMode,
  FormatValueType,
  ProgressBarProps,
  ResolvedProgressBarProps,
  Role,
  Variant,
} from '../ProgressBar.types';

/**
 * Returns a valid progress value.
 * If undefined or greater than 0, returns as-is. If under 0, returns 0.
 */
const getValidValue = (value?: number) => {
  if (!isDefined(value) || value >= 0) return value;
  return 0;
};

/**
 * Returns a valid maximum progress value.
 * Defaults to 1 if the input is undefined or less than or equal to 0.
 */
const getValidMaxValue = (maxValue?: number) => {
  if (!isDefined(maxValue) || maxValue <= 0) return DEFAULT_MAX_VALUE;
  return maxValue;
};

/**
 * Resolves the full set of progress bar props based on provided props.
 *
 * @param props - Input props from the consumer
 * @returns {ResolvedProgressBarProps} Fully resolved progress bar props with:
 * - `value`: Current progress value
 * - `maxValue`: Maximum progress value
 * - `disabled`: Whether the progress bar is disabled
 * - `isIndeterminate`: Whether the bar is in indeterminate mode
 * - `enableAnimation`: Whether animation is enabled
 * - `role`: ARIA role string
 */
export const resolveProgressBarProps = (
  props: ProgressBarProps,
): ResolvedProgressBarProps => {
  // baseline common for all progress bars
  const baseProps = {
    value: getValidValue(props.value),
    maxValue: undefined,
    disabled: false,
    isIndeterminate: false,
    enableAnimation: false,
  };

  // indeterminate
  if (props.isIndeterminate) {
    return {
      ...baseProps,
      role: Role.Progress,
      isIndeterminate: true,
    };
  }

  // determinate with role "meter"
  if (props.roleType === Role.Meter) {
    return {
      ...baseProps,
      role: Role.Meter,
      maxValue: getValidMaxValue(props.maxValue),
      disabled: props.disabled ?? false,
    };
  }

  // determinate with role "progressbar"
  return {
    ...baseProps,
    role: Role.Progress,
    maxValue: getValidMaxValue(props.maxValue),
    disabled: props.disabled ?? false,
    enableAnimation: props.enableAnimation ?? false,
  };
};

/**
 * Determines the animation mode based on progress bar state.
 *
 * @param isIndeterminate - Whether the progress bar is indeterminate
 * @param enableAnimation - Whether animation is enabled
 * @returns The animation mode const value
 */
export const getAnimationMode = (
  isIndeterminate: boolean,
  enableAnimation: boolean,
): AnimationMode => {
  if (isIndeterminate) return AnimationMode.Indeterminate;

  return enableAnimation
    ? AnimationMode.DeterminateAnimated
    : AnimationMode.DeterminatePlain;
};

/**
 * Computes the progress percentage given value and maxValue.
 *
 * @param value - Current progress value
 * @param maxValue - Maximum progress value (optional)
 * @returns Percentage between 0 and 100 (inclusive)
 */
export const getPercentage = (value: number, maxValue?: number): number => {
  const rawPercentage = (value / (maxValue || DEFAULT_MAX_VALUE)) * 100;
  return Math.min(Math.max(Math.round(rawPercentage), 0), 100);
};

/**
 * Formats the progress value as a string based on format type.
 */
export const getFormattedValue = (
  value: number,
  maxValue?: number,
  formatValue?: FormatValueType,
): string => {
  if (typeof formatValue === 'function') {
    return formatValue(value, maxValue);
  }

  switch (formatValue) {
    case 'fraction':
      if (!isDefined(maxValue)) {
        return value.toString();
      }

      return `${value}/${maxValue}`;
    case 'percentage':
      return `${getPercentage(value, maxValue)}%`;
    case 'number':
    default:
      return value.toString();
  }
};

/**
 * Returns appropriate ARIA attributes based on value and maxValue.
 *
 * - If `value` is undefined: `{ 'aria-busy': true }`
 * - If `maxValue` is defined: `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
 * - Otherwise: `aria-valuetext`
 *
 * @param value - Current progress value
 * @param maxValue - Maximum progress value
 * @returns ARIA attributes object
 */
export const getValueAriaAttributes = (value?: number, maxValue?: number) => {
  if (!isDefined(value)) {
    return { 'aria-busy': true };
  }

  if (isDefined(maxValue)) {
    return {
      'aria-valuemin': 0,
      'aria-valuemax': maxValue,
      'aria-valuenow': value,
    };
  }

  return {
    'aria-valuetext': value.toString(),
  };
};

/**
 * Returns an appropriate status icon for the header, based on variant and disabled state.
 * Additionally applies any extra props passed in to the icon.
 */
export const getHeaderIcon = ({
  variant,
  disabled = false,
  props = {},
}: {
  variant?: Variant;
  disabled?: boolean;
  props?: Record<string, any>;
}) => {
  if (disabled) return <WarningIcon {...props} />;

  switch (variant) {
    case Variant.Success:
      return <CheckmarkWithCircleIcon {...props} />;
    case Variant.Warning:
      return <ImportantWithCircleIcon {...props} />;
    case Variant.Error:
      return <WarningIcon {...props} />;
    case Variant.Info:
    default:
      return <InfoWithCircleIcon {...props} />;
  }
};
