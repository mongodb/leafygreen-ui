import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const emptyOptionStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[2]}px;
  font-style: italic;
  font-weight: 300;
  padding-block: ${spacing[1]}px;
`;

export const emptyOptionThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};
