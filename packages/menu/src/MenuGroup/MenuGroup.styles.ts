import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color } from '@leafygreen-ui/tokens';

import { menuColor } from '../styles';

export const getMenuGroupItemStyles = (theme: Theme) => css`
  cursor: unset;
  background-color: ${menuColor[theme].background.default};
`;

export const getMenuGroupTitleStyles = (theme: Theme) => css`
  color: ${color[theme].text.secondary.default};
`;

export const menuGroupULStyles = css`
  margin: 0;
  padding: 0;
`;
