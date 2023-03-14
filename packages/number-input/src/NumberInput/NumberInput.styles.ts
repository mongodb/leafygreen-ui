import { css } from '@leafygreen-ui/emotion';

import { Size } from './NumberInput.types';

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
};
