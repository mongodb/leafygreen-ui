import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { Variant } from './Spinner.types';

// Constants

export const SpinnerSizes: Record<Variant, number> = {
  default: 24,
  large: 48,
  xlarge: 64,
  horizontal: 24,
};

export const SpinnerBottomMargins: Record<Variant, number> = {
  default: spacing[2],
  large: spacing[2],
  xlarge: spacing[3],
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
