import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color } from '@leafygreen-ui/tokens';

export const searchResultsMenuStyles = css`
  box-shadow: 0px 4px 7px ${transparentize(0.75, '#000000')};
  padding: 12px 0;
  border-radius: 12px;
`;

export const getSearchResultsMenuThemeStyles = (theme: Theme) => css`
  background-color: ${color[theme].background.primary.default};
  border: 1px solid ${color[theme].border.secondary.default};
`;

export const searchResultsListStyles = css`
  padding: 0;
  margin: 0;
  border-radius: inherit;
  overflow-y: auto;
  scroll-behavior: smooth;
`;
