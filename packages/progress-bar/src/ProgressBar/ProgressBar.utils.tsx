import React from 'react';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';

import { DEFAULT_COLOR, DEFAULT_MAX_VALUE } from '../constants';

import {
  AnimationMode,
  Color,
  FormatValueType,
  LoaderVariant,
  MeterStatus,
  ProgressBarProps,
  ResolvedProgressBarProps,
  Type,
} from './ProgressBar.types';

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

export const resolveProgressBarProps = (
  props: ProgressBarProps,
): ResolvedProgressBarProps => {
  // baseline for all types of progress bars
  const baseProps = {
    value: props.value,
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
      maxValue: props.maxValue ?? DEFAULT_MAX_VALUE,
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
    maxValue: props.maxValue ?? DEFAULT_MAX_VALUE,
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
  return Math.round((value / (maxValue || DEFAULT_MAX_VALUE)) * 100);
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
      return `${value}/${maxValue}`;
    case 'percentage':
      return `${getPercentage(value, maxValue)}%`;
    case 'number':
    default:
      return value.toString();
  }
};

export const getValueAriaAttributes = (value?: number, maxValue?: number) => {
  return {
    'aria-valuemin': 0,
    ...(value && { 'aria-valuenow': value }),
    ...(maxValue && { 'aria-valuemax': maxValue }),
  };
};

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
