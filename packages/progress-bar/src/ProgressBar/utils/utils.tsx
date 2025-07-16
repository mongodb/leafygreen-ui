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
 * Returns a valid maximum value.
 * - If `maxValue` is undefined, null, or less than or equal to 0, returns `DEFAULT_MAX_VALUE`.
 * - Otherwise, returns `maxValue` as-is.
 *
 * @param maxValue - The input maximum value to validate.
 * @returns The valid maximum value.
 */
const getValidMaxValue = (maxValue?: number) => {
  if (!isDefined(maxValue) || maxValue <= 0) {
    return DEFAULT_MAX_VALUE;
  }

  return maxValue;
};

/**
 * Clamps the given value between 0 and maxValue (if defined).
 * - If `value` is undefined, returns undefined.
 * - If `maxValue` is defined, clamps `value` between 0 and maxValue.
 * - Otherwise, clamps `value` to be at least 0.
 *
 * @param value - The current value.
 * @param maxValue - The optional upper bound.
 * @returns The clamped value, or undefined if value is undefined.
 */
const getValidValue = (value?: number, maxValue?: number) => {
  if (!isDefined(value)) {
    return value;
  }

  if (isDefined(maxValue)) {
    return Math.max(0, Math.min(value, getValidMaxValue(maxValue)));
  }

  return Math.max(0, value);
};

/**
 * Resolves the full set of progress bar props based on provided props.
 *
 * @param props - Input props from the consumer
 * @returns Fully resolved progress bar props with:
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
    value: undefined,
    maxValue: undefined,
    disabled: false,
    isIndeterminate: false,
    enableAnimation: false,
  };

  // indeterminate
  if (props.isIndeterminate) {
    // @ts-expect-error -- roleType is not defined on indeterminate bars
    if (props.roleType === Role.Meter)
      console.warn(
        'Indeterminate progress bars by default are set to "progressbar" role.',
      );

    return {
      ...baseProps,
      role: Role.Progress,
      value: getValidValue(props.value),
      isIndeterminate: true,
    };
  }

  // determinate with role "meter"
  if (props.roleType === Role.Meter) {
    // @ts-expect-error -- enableAnimation is not defined on determinate bars with role "meter"
    if (props.enableAnimation === true)
      console.warn(
        'Determinate progress bars with role "meter" do not support animation.',
      );

    return {
      ...baseProps,
      role: Role.Meter,
      value: getValidValue(props.value, props.maxValue),
      maxValue: getValidMaxValue(props.maxValue),
      disabled: props.disabled ?? false,
    };
  }

  // determinate with role "progressbar"
  return {
    ...baseProps,
    role: Role.Progress,
    value: getValidValue(props.value, props.maxValue),
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
 * Returns a formatted string representation of a progress value.
 *
 * @param value - The current progress value.
 * @param maxValue - The maximum possible value (optional).
 * @param formatValue - Determines how the value is formatted. Can be `percentage`, `fraction`, `number`, or a custom function.
 * @returns A string formatted according to the specified format type.
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
 * See {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-valuenow aria-valuenow} for details.
 * See {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-valuemax aria-valuemax} for details.
 * See {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-valuemin aria-valuemin} for details.
 * See {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label aria-label} for details.
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
 * Returns the appropriate status icon to display in a header.
 *
 * The icon is determined by the `variant` (e.g., success, warning, error, info),
 * or defaults to a disabled warning icon if `disabled` is true.
 * Any additional props provided are spread onto the returned icon component.
 *
 * @param variant - The visual variant representing the status (optional).
 * @param disabled - If true, overrides variant and returns a warning icon (default: false).
 * @param props - Additional props to apply to the icon (e.g., className, size).
 * @returns A React element representing the appropriate status icon.
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
