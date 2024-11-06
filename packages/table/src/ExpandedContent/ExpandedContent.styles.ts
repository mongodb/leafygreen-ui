import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { getCellContainerStyles } from '../Cell/Cell.styles';

export const baseStyles = css`
  padding: 0;
`;

export const expandedContentThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
  `,
};

export const getContainerStyles = (theme: Theme) =>
  cx(expandedContentThemeStyles[theme], getCellContainerStyles());
