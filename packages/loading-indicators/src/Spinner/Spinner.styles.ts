import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { Variant } from './Spinner.types';

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

export const descriptionThemeColor = {
  [Theme.Dark]: palette.gray.light1,
  [Theme.Light]: palette.gray.dark1,
};

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
