import React from 'react';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';

import { ProgressBarVariant } from './ProgressBar.types';

export const iconsOnCompletion = ['success'];

export const getHeaderIcon = (
  variant: ProgressBarVariant,
  props?: Record<string, any>,
) => {
  switch (variant) {
    case 'success':
      return <CheckmarkWithCircleIcon {...props} />;
    case 'warning':
      return <ImportantWithCircleIcon {...props} />;
    case 'error':
      return <WarningIcon {...props} />; // design uses warning icon for error variant
    default:
      return <InfoWithCircleIcon {...props} />;
  }
};

export const getPercentage = (value: number, maxValue: number): number => {
  if (maxValue === 0) return 0;

  return Math.round((value / maxValue) * 100);
};

export const getValueDisplay = (
  value?: number,
  maxValue?: number,
  valueDisplayFormat?: string,
  valueUnits?: string,
): string => {
  if (!value) return '';

  switch (valueDisplayFormat) {
    case 'fraction':
      return `${value}/${maxValue}` + (valueUnits || '');
    case 'percentage':
      return `${getPercentage(value, maxValue || 100)}%`;
    case 'number':
      return value.toString() + (valueUnits || '');
    default:
      return '';
  }
};
