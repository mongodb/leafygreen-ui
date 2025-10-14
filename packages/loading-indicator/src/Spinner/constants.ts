import { Size, spacing } from '@leafygreen-ui/tokens';

export const ROTATION_DURATION = 1215; // ms
export const DASH_DURATION = ROTATION_DURATION * 3; // ms

export const getSpinnerSize = (size: Size | number): number => {
  switch (size) {
    case Size.XSmall:
      return spacing[400];
    case Size.Small:
      return spacing[800];
    case Size.Default:
      return spacing[1200];
    case Size.Large:
      return spacing[1600];
    default:
      return size as number;
  }
};

export const getStrokeWidth = (size: Size | number): number => {
  switch (size) {
    case Size.XSmall:
      return spacing[50] + spacing[25];
    case Size.Small:
      return spacing[150];
    case Size.Default:
      return spacing[200];
    case Size.Large:
      return spacing[200] + spacing[50];
    default:
      return (size / 6) as number;
  }
};

export const getPadding = (size: Size | number): number => {
  switch (size) {
    case Size.XSmall:
      return spacing[50] + spacing[25];
    case Size.Small:
      return spacing[150];
    case Size.Default:
      return spacing[200];
    case Size.Large:
      return spacing[200] + spacing[50];
    default:
      return (size / 6) as number;
  }
};
