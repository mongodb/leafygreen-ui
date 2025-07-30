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
`;

export const getTitleStyles = ({
  theme = Theme.Light,
}: {
  theme: Theme;
}) => css`
  color: ${color[theme].text.secondary.default};
  font-weight: ${fontWeights.semiBold};
  margin-block-end: ${spacing[200]}px;
`;
