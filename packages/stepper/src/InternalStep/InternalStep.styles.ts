import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { stepIconClassName } from '../constants';

export const baseStyles = css`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${spacing[1]}px;
  position: relative; // for the :after line

  &:focus-visible {
    outline: none;
  }
`;

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    &:focus-visible {
      .${stepIconClassName} {
        box-shadow: 0px 0px 0px 2px ${palette.black},
          0px 0px 0px 4px ${palette.blue.light1};
      }
    }
  `,
  [Theme.Light]: css`
    &:focus-visible {
      .${stepIconClassName} {
        box-shadow: 0px 0px 0px 2px ${palette.white},
          0px 0px 0px 4px ${palette.blue.light1};
      }
    }
  `,
};

export const lineStyles = (iconSize: number, darkMode: boolean) => css`
  &:after {
    content: '';
    height: 1px;
    width: 100%;
    position: absolute;
    top: ${iconSize / 2}px;
    left: 50%;
    z-index: 0;
    background-color: ${darkMode ? palette.gray.light1 : palette.gray.base};
  }
`;

export const completedLineStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    &:after {
      background-color: ${palette.green.base};
    }
  `,
  [Theme.Light]: css`
    &:after {
      background-color: ${palette.green.dark1};
    }
  `,
};
