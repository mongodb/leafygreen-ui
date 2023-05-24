import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

import { Variant } from './Spinner.types';

// Constants

export const SpinnerSizes: Record<Variant, number> = {
  default: 24,
  large: 48,
  xlarge: 64,
  horizontal: 24,
};

export const SpinnerBottomMargins: Record<Variant, number> = {
  default: 8,
  large: 8,
  xlarge: 16,
  horizontal: 0,
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

export const horizontalVariantStyles = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;
