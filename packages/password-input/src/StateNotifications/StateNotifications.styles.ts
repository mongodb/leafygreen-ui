import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, spacing, typeScales } from '@leafygreen-ui/tokens';

import { State } from '../PasswordInput/PasswordInput.types';

export const wrapperStyles = css`
  padding: 0;
  margin: 0;
  list-style-type: none;

  // Adding margin to the first item only, this way if there are no items the parent wrapper will not have any margins
  li:first-of-type {
    margin-top: ${spacing[100]}px;
  }
`;

export const baseStyles = css`
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  display: flex;
  gap: ${spacing[100]}px;
`;

export const getStateStyles = (theme: Theme) => ({
  [State.Error]: css`
    color: ${color[theme].text.error.default};
  `,
  [State.Warning]: css`
    color: ${color[theme].text.error.default};
  `,
  [State.Valid]: css`
    color: ${color[theme].text.primary.default};
  `,
  [State.None]: css`
    color: ${color[theme].text.secondary.default};
  `,
});

export const iconBaseStyles = css`
  margin-top: ${spacing[50]}px;
`;

export const getIconStateStyles = (theme: Theme) => ({
  [State.Error]: css`
    color: ${color[theme].icon.error.default};
  `,
  [State.Warning]: css`
    color: ${color[theme].icon.error.default};
  `,
  [State.Valid]: css`
    color: ${color[theme].icon.success.default};
  `,
  [State.None]: css`
    color: ${color[theme].icon.disabled.default};
  `,
});
