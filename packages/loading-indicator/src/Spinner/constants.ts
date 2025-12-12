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
      return size;
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
      return size / 6;
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
      return size / 6;
  }
};

/**
 * Returns the horizontal gap based on size
 */
export const getHorizontalGap = (size: Size | number): number => {
  switch (size) {
    case Size.XSmall:
    case Size.Small:
      return spacing[150]; // 6px
    case Size.Default:
      return spacing[200]; // 8px
    case Size.Large:
      return spacing[300]; // 12px
    default:
      return size / 4;
  }
};

/**
 * Returns the vertical gap based on size
 */
export const getVerticalGap = (size: Size | number): number => {
  switch (size) {
    case Size.XSmall:
    case Size.Small:
    case Size.Default:
      return spacing[200]; // 8px
    case Size.Large:
      return spacing[400]; // 16px
    default:
      return size / 3;
  }
};
