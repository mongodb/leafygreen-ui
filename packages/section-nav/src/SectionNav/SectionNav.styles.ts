import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, fontWeights, spacing } from '@leafygreen-ui/tokens';

export const navStyles = css``;

export const getOrderedListStyles = ({
  theme = Theme.Light,
}: {
  theme: Theme;
}) => css`
  padding: 0;
  margin: 0;
  border-left: 1px solid ${color[theme].border.secondary.default};
  --depth: 0;
  --plus: 0;
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
