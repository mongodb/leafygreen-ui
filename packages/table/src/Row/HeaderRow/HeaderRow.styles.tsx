import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const getBaseStyles = (theme: Theme) => css`
  background-color: inherit;
  position: relative;

  &:last-of-type {
    box-shadow: 0 4px
      ${theme === Theme.Dark ? palette.gray.dark2 : palette.gray.light2};
  }
`;
