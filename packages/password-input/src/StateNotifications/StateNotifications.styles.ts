import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, typeScales } from '@leafygreen-ui/tokens';

import { State } from '../PasswordInput/PasswordInput.types';

export const wrapperStyles = css`
  padding: 0;
  margin: 0;
  list-style-type: none;

  // Adding margin to the first item only, this way if there are no items the parent wrapper will not have any margins
  li:first-of-type {
    margin-top: ${spacing[1]}px;
  }
`;

export const baseStyles = css`
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  display: flex;
  gap: ${spacing[1]}px;
`;

export const themeStyles: Record<Theme, Record<State, string>> = {
  [Theme.Light]: {
    [State.Error]: css`
      color: ${palette.red.base};
    `,
    [State.Warning]: css`
      color: ${palette.red.base};
    `,
    [State.Valid]: css`
      color: ${palette.black};
    `,
    [State.None]: css`
      color: ${palette.gray.light1};
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
      color: ${palette.gray.light2};
    `,
    [State.None]: css`
      color: ${palette.gray.base};
    `,
  },
};

export const iconBaseStyles = css`
  margin-top: 2px;
`;

export const iconThemeStateStyles: Record<Theme, Record<State, string>> = {
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
    [State.None]: css`
      color: ${palette.gray.light1};
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
    [State.None]: css`
      color: ${palette.gray.base};
    `,
  },
};
