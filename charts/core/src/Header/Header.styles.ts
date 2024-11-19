import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

export const getContainerStyles = (theme: Theme, showDivider?: boolean) => css`
  border-bottom: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  display: grid;
  grid-template-columns: auto 1fr;
  height: 36px;
  padding: ${spacing[100]}px ${spacing[300]}px;
  width: 100%;

  ${showDivider &&
  `border-top: 1px solid ${
    color[theme].border[Variant.Disabled][InteractionState.Default]
  };`}
`;

export const titleStyles = css`
  display: flex;
  align-items: center;
`;
