import React from 'react';
import omit from 'lodash/omit';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { isDefined } from '@leafygreen-ui/lib';

import { DEFAULT_LGID_ROOT } from '../../testing';
import {
  DEFAULT_MAX_VALUE,
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  iconsPendingCompletion,
} from '../constants';
import {
  AnimatedVariant,
  AnimationMode,
  FormatValueType,
  ProgressBarProps,
  ResolvedProgressBarProps,
  Role,
  Variant,
} from '../ProgressBar.types';

import {
  warnAnimatedVariant,
  warnEnableAnimationFlag,
  warnMeterRole,
} from './warningUtils';

/**
 * Returns a valid maximum value.
 * - If `maxValue` is undefined, null, or less than or equal to 0, returns `DEFAULT_MAX_VALUE`.
 * - Otherwise, returns `maxValue` as-is.
 *
 * @param maxValue - The input maximum value to validate.
 * @returns The valid maximum value.
 */
export const getValidMaxValue = (maxValue?: number) => {
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
export const getValidValue = (value?: number, maxValue?: number) => {
  if (!isDefined(value)) {
    return value;
  }

  if (isDefined(maxValue)) {
    return Math.max(0, Math.min(value, getValidMaxValue(maxValue)));
  }

  return Math.max(0, value);
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

interface GetHeaderIconParams {
  /** Optional progress bar variant. */
  variant?: Variant;
  /** If true, overrides variant and returns a warning icon. */
  disabled?: boolean;
  /** Additional props to spread onto the icon (e.g., className, size). */
  props?: Record<string, any>;
}

/**
 * Returns the appropriate status icon to display in a header.
 */
export const getHeaderIcon = ({
  variant,
  disabled = false,
  props = {},
}: GetHeaderIconParams) => {
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

/**
 * Omits resolved props from the original props object.
 * Useful for spreading the remaining props while excluding custom resolved ones.
 *
 * @param obj - Original props object
 * @param omit - Props to omit
 * @returns New object with omitted props
 */
export const omitProps = (
  obj: ProgressBarProps,
  toOmit: any = {},
): Omit<ProgressBarProps, keyof ProgressBarProps> => {
  return omit(obj, Object.keys(toOmit));
};

/** Helper function to check if a variant is animated. */
export const isAnimatedVariant = (variant: Variant) => {
  const ANIMATED_VARIANTS = Object.values(AnimatedVariant);
  return (ANIMATED_VARIANTS as Array<Variant>).includes(variant);
};

/**
 * Resolves the final props for the progress bar component.
 * - Validates and normalizes conditional values like `value`, `maxValue`, `role`, and `enableAnimation`.
 * - Applies default values where necessary.
 *
 * @param props - The initial props passed to the progress bar
 * @returns Resolved props object with a complete set ready for rendering.
 */
export const resolveProgressBarProps = (
  props: ProgressBarProps,
): ResolvedProgressBarProps => {
  // extract consumer props and apply defaults
  const {
    size = DEFAULT_SIZE,
    label,
    description,
    variant = DEFAULT_VARIANT,
    darkMode,
    formatValue,
    className,
    'aria-label': ariaLabel,
    'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
    showIcon,
  } = props;

  // create base props object
  const base: ResolvedProgressBarProps = {
    size,
    label,
    description,
    variant,
    darkMode,
    formatValue,
    className,
    'aria-label': ariaLabel,
    'data-lgid': dataLgId,

    showIcon: false,
    role: Role.Progress,
    value: undefined,
    maxValue: undefined,
    disabled: false,
    isIndeterminate: false,
    enableAnimation: false,
  };

  // apply discriminant-based overrides
  const overrides: Partial<ResolvedProgressBarProps> = {};

  if (props.isIndeterminate) {
    warnMeterRole(props);
    warnAnimatedVariant(props);

    overrides.isIndeterminate = true;
    overrides.value = getValidValue(props.value);
    overrides.variant = isAnimatedVariant(variant) ? variant : DEFAULT_VARIANT;
  } else if (props.role === Role.Meter) {
    warnEnableAnimationFlag(props);

    overrides.role = Role.Meter;
    overrides.value = getValidValue(props.value, props.maxValue);
    overrides.maxValue = getValidMaxValue(props.maxValue);
    overrides.disabled = props.disabled ?? false;
  } else {
    if (props.enableAnimation) warnAnimatedVariant(props);

    overrides.value = getValidValue(props.value, props.maxValue);
    overrides.maxValue = getValidMaxValue(props.maxValue);
    overrides.disabled = props.disabled ?? false;
    overrides.enableAnimation =
      props.enableAnimation && isAnimatedVariant(variant);
  }

  // based on overrides, set icon visibility
  overrides.showIcon = iconsPendingCompletion.includes(variant)
    ? showIcon && overrides.value === overrides.maxValue
    : showIcon;

  return {
    ...base,
    ...overrides,
    ...omitProps(props, base),
  };
};
