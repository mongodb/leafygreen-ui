import React from 'react';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { getNodeTextContent, isDefined } from '@leafygreen-ui/lib';

import { DEFAULT_COLOR, DEFAULT_MAX_VALUE } from '../../constants';
import {
  AnimationMode,
  Color,
  FormatValueType,
  LoaderVariant,
  MeterStatus,
  ProgressBarProps,
  ResolvedProgressBarProps,
  Type,
} from '../ProgressBar.types';

const getMeterStatusColor = (status?: MeterStatus): Color => {
  switch (status) {
    case MeterStatus.Healthy:
      return Color.Green;
    case MeterStatus.Warning:
      return Color.Yellow;
    case MeterStatus.Danger:
      return Color.Red;
    default:
      return Color.Blue;
  }
};

const getLoaderVariantColor = (variant?: LoaderVariant): Color => {
  switch (variant) {
    case LoaderVariant.Success:
      return Color.Green;
    case LoaderVariant.Warning:
      return Color.Yellow;
    case LoaderVariant.Error:
      return Color.Red;
    case LoaderVariant.Info:
    default:
      return Color.Blue;
  }
};

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
  // baseline for all types of progress bars
  const baseProps = {
    value: getValidValue(props.value),
    maxValue: undefined,
    disabled: false,
    color: DEFAULT_COLOR,
    isIndeterminate: false,
    enableAnimation: false,
  };

  // meter type progress bar
  if (props.type === Type.Meter) {
    return {
      ...baseProps,
      maxValue: getValidMaxValue(props.maxValue),
      disabled: props.disabled ?? false,
      color: getMeterStatusColor(props.status),
    };
  }

  // indeterminate loader progress bar
  if (props.isIndeterminate) {
    return {
      ...baseProps,
      isIndeterminate: true,
      color: getLoaderVariantColor(props.variant),
    };
  }

  // determinate loader progress bar
  return {
    ...baseProps,
    maxValue: getValidMaxValue(props.maxValue),
    disabled: props.disabled ?? false,
    color: getLoaderVariantColor(props.variant),
    enableAnimation: props.enableAnimation ?? false,
  };
};

export const getAnimationMode = ({
  type,
  isIndeterminate,
  enableAnimation,
}: {
  type: Type;
  isIndeterminate: boolean;
  enableAnimation: boolean;
}): AnimationMode => {
  if (type === Type.Meter) return AnimationMode.DeterminateBase;
  if (isIndeterminate) return AnimationMode.Indeterminate;

  return enableAnimation
    ? AnimationMode.DeterminateAnimated
    : AnimationMode.DeterminateBase;
};

export const getPercentage = (value: number, maxValue?: number): number => {
  const percentage = (value / (maxValue || DEFAULT_MAX_VALUE)) * 100;
  return Math.min(Math.max(percentage, 0), 100);
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
  type: Type,
  label?: React.ReactNode,
  description?: React.ReactNode,
) => {
  const role = type === Type.Meter ? 'meter' : 'progressbar';

  const progressBarId = label
    ? `${role}-for-${getNodeTextContent(label)}`
    : role;

  return {
    role,
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
  color,
  disabled = false,
  props = {},
}: {
  color: Color;
  disabled?: boolean;
  props?: Record<string, any>;
}) => {
  if (disabled) return <WarningIcon {...props} />;

  switch (color) {
    case Color.Green:
      return <CheckmarkWithCircleIcon {...props} />;
    case Color.Yellow:
      return <ImportantWithCircleIcon {...props} />;
    case Color.Red:
      return <WarningIcon {...props} />;
    case Color.Blue:
    default:
      return <InfoWithCircleIcon {...props} />;
  }
};
