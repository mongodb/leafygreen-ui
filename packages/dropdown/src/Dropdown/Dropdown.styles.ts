import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const baseMenuStyle = css`
  position: relative;
  text-align: left;
  width: 100%;
  border-radius: 3px;
  line-height: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto;
  border-radius: 12px;
`;

export const menuThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
    box-shadow: 0 4px 7px 0 ${transparentize(0.75, palette.black)};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark3};
    border: 1px solid ${palette.gray.dark2};
  `,
};

export const menuListStyle = css`
  position: relative;
  margin: 0;
  padding: 0;
`;
