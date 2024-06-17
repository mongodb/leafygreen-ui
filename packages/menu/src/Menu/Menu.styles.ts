import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { menuColor } from '../styles';

export interface MenuStyleArgs {
  theme: Theme;
}

export const getMenuStyles = ({ theme }: MenuStyleArgs) => {
  return css`
    width: 210px;
    border-radius: ${spacing[300]}px;
    overflow: auto;
    // FIXME: Should this really be 14px?
    padding: ${spacing[300] + spacing[50]}px 0;

    background-color: ${menuColor[theme].background.default};
    border: 1px solid ${menuColor[theme].border.default};

    /* // Light mode only */
    ${theme === 'light' &&
    css`
      box-shadow: 0 2px 4px 1px ${transparentize(0.85, palette.black)};
    `}
  `;
};

export const scrollContainerStyle = css`
  overflow: auto;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  padding: 0px;
`;
