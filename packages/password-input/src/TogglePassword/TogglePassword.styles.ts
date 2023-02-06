import { css } from '@leafygreen-ui/emotion';

import { SizeVariant } from '../PasswordInput/PasswordInput.types';

export const baseStyles = css`
  position: absolute;
  top: 50%;
  transform: translate(0px, -50%);
`;

export const sizeStyles: Record<SizeVariant, string> = {
  [SizeVariant.Small]: css`
    right: 5px;
    width: 22px;
    height: 22px;
  `,
  [SizeVariant.Default]: css`
    right: 5px;
  `,
  [SizeVariant.Large]: css`
    right: 10px;
  `,
};
