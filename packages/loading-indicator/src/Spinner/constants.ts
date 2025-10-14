import { spacing } from '@leafygreen-ui/tokens';

import { SpinnerSize } from './Spinner.types';

export const ROTATION_DURATION = 1500; // ms
export const DASH_DURATION = ROTATION_DURATION * 3; // ms

export const getSpinnerSize = (size: SpinnerSize | number): number => {
  switch (size) {
    case SpinnerSize.XSmall:
      return spacing[200];
    case SpinnerSize.Small:
      return spacing[400];
    case SpinnerSize.Default:
      return spacing[600];
    case SpinnerSize.Large:
      return spacing[1200];
    case SpinnerSize.XLarge:
      return spacing[1600];
    default:
      return size as number;
  }
};

export const getStrokeWidth = (size: SpinnerSize | number): number => {
  switch (size) {
    case SpinnerSize.XSmall:
      return spacing[50];
    case SpinnerSize.Small:
      return spacing[50] + spacing[25];
    case SpinnerSize.Default:
      return spacing[100];
    case SpinnerSize.Large:
      return spacing[200];
    case SpinnerSize.XLarge:
      return spacing[200] + spacing[50];
    default:
      return (size / 6) as number;
  }
};
