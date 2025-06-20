import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, fontWeights, spacing } from '@leafygreen-ui/tokens';

export const navStyles = css``;

export const orderedListStyles = css`
  all: unset;
`;

export const getTitleStyles = ({
  theme = Theme.Light,
}: {
  theme: Theme;
}) => css`
  color: ${color[theme].text.secondary.default};
  font-weight: ${fontWeights.bold};
  margin-block-end: ${spacing[200]}px;
`;
