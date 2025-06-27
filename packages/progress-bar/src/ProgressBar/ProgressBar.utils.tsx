import React from 'react';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';

import {
  FormatValueType,
  MeterStatus,
  ProgressBarProps,
  ResolvedProgressBarProps,
  Type,
  Variant,
} from './ProgressBar.types';

export const DEFAULT_MAX_VALUE = 1;
export const DEFAULT_VARIANT = Variant.Info;

export const iconsVisibleOnComplete = ['success'];

const getMeterStatusVariant = (status?: MeterStatus): Variant => {
  switch (status) {
    case MeterStatus.Healthy:
      return Variant.Success;
    case MeterStatus.Warning:
      return Variant.Warning;
    case MeterStatus.Error:
      return Variant.Error;
    default:
      return Variant.Info;
  }
};

export const resolveProgressBarProps = (
  props: ProgressBarProps,
): ResolvedProgressBarProps => {
  const baseProps = {
    value: props.value,
    maxValue: undefined,
    disabled: false,
    variant: DEFAULT_VARIANT,
    isDeterminate: true,
    enableAnimation: false,
  };

  if (props.type === Type.Meter) {
    return {
      ...baseProps,
      value: props.value,
      maxValue: props.maxValue ?? DEFAULT_MAX_VALUE,
      disabled: props.disabled ?? false,
      variant: getMeterStatusVariant(props.status),
    };
  }

  if (props.isIndeterminate) {
    return {
      ...baseProps,
      isDeterminate: false,
      variant: props.variant ?? DEFAULT_VARIANT,
    };
  }

  return {
    ...baseProps,
    value: props.value,
    maxValue: props.maxValue ?? DEFAULT_MAX_VALUE,
    disabled: props.disabled ?? false,
    variant: props.variant ?? DEFAULT_VARIANT,
    enableAnimation: props.enableAnimation ?? false,
  };
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
  variant,
  disabled = false,
  props = {},
}: {
  variant: Variant;
  disabled?: boolean;
  props?: Record<string, any>;
}) => {
  if (disabled) return <WarningIcon {...props} />;

  switch (variant) {
    case 'success':
      return <CheckmarkWithCircleIcon {...props} />;
    case 'warning':
      return <ImportantWithCircleIcon {...props} />;
    case 'error':
      return <WarningIcon {...props} />; // design uses warning icon for error variant
    case 'info':
    default:
      return <InfoWithCircleIcon {...props} />;
  }
};
