import React from 'react';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';

import { ProgressBarValueType, ProgressBarVariant } from './ProgressBar.types';

export const DEFAULT_MAX_VALUE = 1;
export const iconsVisibleOnComplete = ['success'];

export const getFormattedValue = (
  value: number,
  maxValue?: number,
  formatValue?: ProgressBarValueType,
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

export const getPercentage = (value: number, maxValue?: number): number => {
  return Math.round((value / (maxValue || DEFAULT_MAX_VALUE)) * 100);
};

export const getHeaderIcon = (
  variant: ProgressBarVariant,
  disabled?: boolean,
  props?: Record<string, any>,
) => {
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
