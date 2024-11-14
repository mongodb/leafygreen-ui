import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

export const getContainerStyles = (theme: Theme) => css`
  width: 100%;
  padding: ${spacing[150]}px ${spacing[300]}px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  border-top: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  border-bottom: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
`;

export const alignCenterStyles = css`
  display: flex;
  align-items: center;
`;

export const inputContentStyles = css`
  margin-right: ${spacing[300]}px;
`;

export const collapseIconStyles = css`
  transform: rotate(0deg);
  transition: transform ${transitionDuration.slower}ms ease-in-out;

  &.collapsed {
    transform: rotate(-90deg);
  }
`;
