import { css } from '@leafygreen-ui/emotion';

import { Size } from '../PasswordInput/PasswordInput.types';

export const baseStyles = css`
  position: absolute;
  top: 50%;
  transform: translate(0px, -50%);
`;

export const sizeStyles: Record<Size, string> = {
  [Size.Small]: css`
    right: 5px;
    width: 22px;
    height: 22px;
  `,
  [Size.Default]: css`
    right: 5px;
  `,
  [Size.Large]: css`
    right: 10px;
  `,
};
