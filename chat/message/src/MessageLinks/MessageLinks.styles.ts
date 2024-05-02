import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  container-type: inline-size;
  margin-bottom: ${spacing[200]}px;
`;

export const dividingLineStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    border: 1px solid ${palette.gray.dark2};
  `,
  [Theme.Light]: css`
    border: 1px solid ${palette.gray.light2};
  `,
};

export const linksHeadingStyles = css`
  margin-bottom: ${spacing[200]}px;
`;
