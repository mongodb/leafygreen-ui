import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

export const getContainerStyles = (theme: Theme) => css`
  border: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  border-radius: ${borderRadius[200]}px;
  overflow: hidden;
  width: 100%;
  display: grid;
  grid-template-rows: 40px 0fr;
  transition: grid-template-rows ${transitionDuration.slower}ms ease-in-out;

  &.open {
    grid-template-rows: 40px 1fr;
  }
`;

export const getHeaderStyles = (theme: Theme) => css`
  width: 100%;
  padding: ${spacing[150]}px ${spacing[300]}px;
  display: grid;
  grid-template-columns: auto 1fr;
`;

export const childrenContainerStyles = css`
  overflow: hidden;
`;

export const toggleButtonStyles = css`
  margin-right: ${spacing[100]}px;
`;

export const toggleIconStyles = css`
  transform: rotate(-90deg);
  transition: transform ${transitionDuration.slower}ms ease-in-out;

  &.open {
    transform: rotate(0deg);
  }
`;

export const leftInnerContainerStyles = css`
  display: flex;
  align-items: center;
`;
