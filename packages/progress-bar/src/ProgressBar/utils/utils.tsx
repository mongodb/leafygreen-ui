import React from 'react';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { getNodeTextContent, isDefined } from '@leafygreen-ui/lib';

import { DEFAULT_MAX_VALUE } from '../../constants';
import {
  AnimationMode,
  FormatValueType,
  ProgressBarProps,
  ResolvedProgressBarProps,
  Role,
  Variant,
} from '../ProgressBar.types';

const getValidValue = (value?: number) => {
  if (!isDefined(value) || value >= 0) return value;
  return 0;
};

const getValidMaxValue = (maxValue?: number) => {
  if (!isDefined(maxValue) || maxValue <= 0) return DEFAULT_MAX_VALUE;
  return maxValue;
};

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

export const getAnimationMode = ({
  isIndeterminate,
  enableAnimation,
}: {
  isIndeterminate: boolean;
  enableAnimation: boolean;
}): AnimationMode => {
  if (isIndeterminate) return AnimationMode.Indeterminate;

  return enableAnimation
    ? AnimationMode.DeterminateAnimated
    : AnimationMode.DeterminatePlain;
};

export const getPercentage = (value: number, maxValue?: number): number => {
  const rawPercentage = (value / (maxValue || DEFAULT_MAX_VALUE)) * 100;
  return Math.min(Math.max(Math.round(rawPercentage), 0), 100);
};

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

export const getProgressBarIdentifiers = (
  role: Role,
  label?: React.ReactNode,
  description?: React.ReactNode,
) => {
  const progressBarId = label
    ? `${role}-for-${getNodeTextContent(label)}`
    : role;

  return {
    barId: progressBarId,
    labelId: label ? `label-for-${progressBarId}` : undefined,
    descId: description ? `desc-for-${progressBarId}` : undefined,
    liveId: `live-region-for-${progressBarId}`,
  };
};

export const getValueAriaAttributes = (value?: number, maxValue?: number) => ({
  ...(value == undefined
    ? { 'aria-busy': true }
    : isDefined(maxValue)
    ? {
        'aria-valuemin': 0,
        'aria-valuemax': maxValue,
        'aria-valuenow': value,
      }
    : {
        'aria-valuetext': value.toString(),
      }),
});

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
