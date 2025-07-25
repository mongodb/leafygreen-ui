import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

export const containerStyles = css`
  container-type: inline-size;
  margin-bottom: ${spacing[200]}px;
`;

export const getDividerStyles = (theme: Theme) => css`
  border: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
`;

export const linksHeadingStyles = css`
  margin-bottom: ${spacing[200]}px;
`;
