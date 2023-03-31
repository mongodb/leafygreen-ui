import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const stickyStyles = css`
  position: sticky;
  top: 0;
`;
export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.black};
    box-shadow: 0 4px ${palette.gray.dark2};
  `,
  [Theme.Light]: css`
    background-color: ${palette.white};
    box-shadow: 0 4px ${palette.gray.light2};
  `,
};
