import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color } from '@leafygreen-ui/tokens';

import { menuColor } from '../styles';

export const borderStyle = css`
  height: 16px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const borderThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &::before {
      background-color: ${menuColor.light.border.default};
    }
  `,
  [Theme.Dark]: css`
    &::before {
      background-color: ${menuColor.dark.border.default};
    }
  `,
};

export const borderDarkInLightModeStyles = css`
  &::before {
    background-color: ${color.dark.border.secondary.default};
  }
`;
