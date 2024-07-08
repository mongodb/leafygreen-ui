import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { Size } from '../PasswordInput/PasswordInput.types';

export const baseStyles = css`
  position: absolute;
  top: 50%;
  transform: translate(0px, -50%);
`;

export const sizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    right: ${spacing[200]}px;
    width: 22px;
    height: 22px;
  `,
  [Size.Small]: css`
    right: ${spacing[200]}px;
    width: 22px;
    height: 22px;
  `,
  [Size.Default]: css`
    right: ${spacing[300]}px;
  `,
  [Size.Large]: css`
    right: ${spacing[300]}px;
  `,
};
