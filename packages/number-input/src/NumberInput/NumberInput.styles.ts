import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, typeScales } from '@leafygreen-ui/tokens';

import { Size } from './NumberInput.types';

export const wrapperBaseStyles = css`
  display: flex;
  flex-wrap: no-wrap;
`;

export const wrapperSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
  `,
  [Size.Small]: css`
    height: 28px;
  `,
  [Size.Default]: css`
    height: 36px;
  `,
};

export const wrapperGapStyles = css`
  gap: ${spacing[1] * 3}px;
`;

export const unitBaseStyles = css`
  align-self: center;
`;

export const unitThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

export const unitDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};
  `,
};

export const errorMessageStyles = css`
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
`;

export const labelDescriptionStyles = css`
  margin-bottom: ${spacing[1]}px;
`;
