import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { DisplayOption } from './Spinner.types';

// Constants
export const SpinnerSizes: Record<DisplayOption, number> = {
  [DisplayOption.DefaultHorizontal]: 24,
  [DisplayOption.DefaultVertical]: 24,
  [DisplayOption.LargeVertical]: 48,
  [DisplayOption.XlargeVertical]: 64,
};

export const SpinnerBottomMargins: Record<DisplayOption, number> = {
  [DisplayOption.DefaultHorizontal]: 0,
  [DisplayOption.DefaultVertical]: spacing[2],
  [DisplayOption.LargeVertical]: spacing[2],
  [DisplayOption.XlargeVertical]: spacing[3],
};

// Styles
export const rootStyles = css`
  text-align: center;
`;

export const darkModeSpinnerStyles = css`
  path {
    stroke: ${palette.green.base};
  }
`;

export const colorOverrideStyles = (color: string) => css`
  path {
    stroke: ${color};
  }
`;

export const horizontalDisplayOptionStyles = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;
