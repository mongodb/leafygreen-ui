import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, typeScales } from '@leafygreen-ui/tokens';

import { States } from '../PasswordInput/PasswordInput.types';

export const baseStyles = css`
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  display: flex;
  gap: ${spacing[1]}px;
`;

export const themeStyles: Record<Theme, Record<States, string>> = {
  [Theme.Light]: {
    [States.Error]: css`
      color: ${palette.red.base};
    `,
    [States.Warning]: css`
      color: ${palette.red.base};
    `,
    [States.Valid]: css`
      color: ${palette.black};
    `,
    [States.None]: css`
      color: ${palette.gray.light1};
    `,
  },
  [Theme.Dark]: {
    [States.Error]: css`
      color: ${palette.red.light1};
    `,
    [States.Warning]: css`
      color: ${palette.red.light1};
    `,
    [States.Valid]: css`
      color: ${palette.gray.light2};
    `,
    [States.None]: css`
      color: ${palette.gray.base};
    `,
  },
};

export const iconBaseStyles = css`
  margin-top: 2px;
`;

export const iconThemeStateStyles: Record<Theme, Record<States, string>> = {
  [Theme.Light]: {
    [States.Error]: css`
      color: ${palette.red.base};
    `,
    [States.Warning]: css`
      color: ${palette.red.base};
    `,
    [States.Valid]: css`
      color: ${palette.green.dark1};
    `,
    [States.None]: css`
      color: ${palette.gray.light1};
    `,
  },
  [Theme.Dark]: {
    [States.Error]: css`
      color: ${palette.red.light1};
    `,
    [States.Warning]: css`
      color: ${palette.red.light1};
    `,
    [States.Valid]: css`
      color: ${palette.green.base};
    `,
    [States.None]: css`
      color: ${palette.gray.base};
    `,
  },
};
