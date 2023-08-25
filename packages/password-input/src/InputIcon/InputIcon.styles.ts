import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { Size, State } from '../PasswordInput/PasswordInput.types';

import { StateProps } from './InputIcon.types';

export const baseStyles = css`
  position: absolute;
  top: 50%;

  transform: translate(0%, -50%);
`;

export const sizeStyles: Record<Size, string> = {
  [Size.Small]: css`
    right: ${spacing[1] * 7}px;
  `,
  [Size.Default]: css`
    right: ${spacing[5]}px;
  `,
  [Size.Large]: css`
    right: ${spacing[1] * 10}px;
  `,
};

export const themeStateStyles: Record<Theme, Record<StateProps, string>> = {
  [Theme.Light]: {
    [State.Error]: css`
      color: ${palette.red.base};
    `,
    [State.Warning]: css`
      color: ${palette.red.base};
    `,
    [State.Valid]: css`
      color: ${palette.green.dark1};
    `,
  },
  [Theme.Dark]: {
    [State.Error]: css`
      color: ${palette.red.light1};
    `,
    [State.Warning]: css`
      color: ${palette.red.light1};
    `,
    [State.Valid]: css`
      color: ${palette.green.base};
    `,
  },
};

export const disabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};
