import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, spacing } from '@leafygreen-ui/tokens';

import { Size } from './NumberInput.types';

export const labelDescriptionStyles = css`
  margin-bottom: ${spacing[1]}px;
  display: flex;
  flex-direction: column;
`;

export const wrapperBaseStyles = css`
  display: flex;
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
  [Size.Large]: css`
    height: 48px;
  `,
};

export const wrapperGapStyles = css`
  gap: 12px;
`;

export const unitBaseStyles = css`
  align-self: center;
`;

export const getUnitThemeStyles = (theme: Theme) => css`
  color: ${color[theme].text.secondary.default};
`;

export const getUnitDisabledStyles = (theme: Theme) => css`
  color: ${color[theme].text.disabled.default};
`;
