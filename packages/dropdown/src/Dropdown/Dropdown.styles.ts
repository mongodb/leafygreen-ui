import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { RenderedContext } from '@leafygreen-ui/input-option';
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

export const menuThemeStyles = (
  theme: Theme,
  renderedContext: RenderedContext,
) => {
  if (theme === Theme.Light && renderedContext === RenderedContext.Menu) {
    return css`
      background-color: ${palette.black};
      border: 1px solid ${palette.black};
    `;
  }

  if (theme === Theme.Light) {
    return css`
      background-color: ${palette.white};
      box-shadow: 0 4px 7px 0 ${transparentize(0.75, palette.black)};
    `;
  }

  if (theme === Theme.Dark) {
    return css`
      background-color: ${palette.gray.dark3};
      border: 1px solid ${palette.gray.dark2};
    `;
  }
};

export const menuListStyle = css`
  position: relative;
  margin: 0;
  padding: 0;
`;
