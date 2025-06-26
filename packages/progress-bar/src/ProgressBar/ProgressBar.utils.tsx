import React from 'react';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';

import {
  FormatValueType,
  ProgressBarProps,
  Variant,
} from './ProgressBar.types';

export const DEFAULT_MAX_VALUE = 1;

export const iconsVisibleOnComplete = ['success'];

export const resolveProps = (
  props: ProgressBarProps,
): {
  value: number | undefined;
  maxValue: number | undefined;
  disabled: boolean;
  variant: Variant;
  isDeterminate: boolean;
} => {
  if (props.type === 'meter') {
    return {
      value: props.value,
      maxValue: props.maxValue ?? DEFAULT_MAX_VALUE,
      disabled: props.disabled ?? false,
      variant: Variant.Info, // temporary
      isDeterminate: true,
    };
  }

  if (props.isIndeterminate) {
    return {
      value: props.value,
      maxValue: undefined,
      disabled: false,
      variant: props.variant ?? Variant.Info,
      isDeterminate: false,
    };
  } else {
    return {
      value: props.value,
      maxValue: props.maxValue ?? DEFAULT_MAX_VALUE,
      disabled: props.disabled ?? false,
      variant: props.variant ?? Variant.Info,
      isDeterminate: true,
    };
  }
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
