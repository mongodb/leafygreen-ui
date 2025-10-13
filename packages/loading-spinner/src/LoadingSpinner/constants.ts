import { spacing } from '@leafygreen-ui/tokens';

import { LoadingSpinnerSize } from './LoadingSpinner.types';

export const ROTATION_DURATION = 1500; // ms
export const DASH_DURATION = 4000; // ms

export const getSpinnerSize = (size: LoadingSpinnerSize | number): number => {
  switch (size) {
    case LoadingSpinnerSize.XSmall:
      return spacing[200];
    case LoadingSpinnerSize.Small:
      return spacing[400];
    case LoadingSpinnerSize.Default:
      return spacing[600];
    case LoadingSpinnerSize.Large:
      return spacing[1200];
    case LoadingSpinnerSize.XLarge:
      return spacing[1600];
    default:
      return size as number;
  }
};

export const getStrokeWidth = (size: LoadingSpinnerSize | number): number => {
  switch (size) {
    case LoadingSpinnerSize.XSmall:
      return spacing[50];
    case LoadingSpinnerSize.Small:
      return spacing[50] + spacing[25];
    case LoadingSpinnerSize.Default:
      return spacing[100];
    case LoadingSpinnerSize.Large:
      return spacing[200];
    case LoadingSpinnerSize.XLarge:
      return spacing[200] + spacing[50];
    default:
      return (size / 6) as number;
  }
};
