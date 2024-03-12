import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';

import { Size } from '../Avatar.types';

export const baseStyles = css`
  background-color: ${palette.gray.dark1};
  color: ${palette.white};
  font-family: ${fontFamilies.default};
`;

export const sizeStyles: Record<Size, string> = {
  [Size.Default]: css`
    font-size: 20px;
  `,
  [Size.Small]: css`
    font-size: 15px;
  `,
};
