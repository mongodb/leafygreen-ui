import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const searchResultsMenuStyles = css`
  box-shadow: 0px 4px 7px ${transparentize(0.75, '#000000')};
  padding: 12px 0;
  border-radius: 12px;
`;

export const searchResultsMenuThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
    border: 1px solid ${palette.gray.light2};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark3};
    border: 1px solid ${palette.gray.dark2};
  `,
};

export const searchResultsListStyles = css`
  padding: 0;
  margin: 0;
  border-radius: inherit;
  overflow-y: auto;
  scroll-behavior: smooth;
`;
