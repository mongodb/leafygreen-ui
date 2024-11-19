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
  grid-template-columns: auto 1fr;
  border-bottom: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
`;

export const alignCenterStyles = css`
  display: flex;
  align-items: center;
`;

export const toggleIconStyles = css`
  transform: rotate(-90deg);
  transition: transform ${transitionDuration.slower}ms ease-in-out;

  &.open {
    transform: rotate(0deg);
  }
`;
