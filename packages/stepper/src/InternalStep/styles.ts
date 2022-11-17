import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { stepIconClassName } from '../constants';

export const baseStyles = (darkMode?: boolean) => css`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${spacing[1]}px;
  position: relative; // for the :after line

  &:focus-visible {
    outline: none;
    .${stepIconClassName} {
      // TODO: should use box-shadow utility for this.
      box-shadow: 0px 0px 0px 2px ${darkMode ? palette.black : palette.white},
        0px 0px 0px 4px ${palette.blue.light1};
    }
  }
`;

export const lineStyles = (iconSize: number, darkMode?: boolean) => css`
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

export const completedLineStyles = (darkMode?: boolean) => css`
  &:after {
    background-color: ${darkMode ? palette.green.base : palette.green.dark1};
  }
`;
