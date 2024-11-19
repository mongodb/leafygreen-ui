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

export const getContainerStyles = (
  theme: Theme,
  height?: number,
  headerHeight?: number,
) => css`
  border: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  border-radius: ${borderRadius[200]}px;
  overflow: hidden;
  width: 100%;

  /**
  * Height adjustments are being made on the entire container instead of just
  * a wrapper around the children because a bottom border is set on the container and header.
  * By shrinking the container height we prevent a conflict between the container border 
  * and the header border when collapsed. By making the container height 1px shorter on collapse
  * we just cutoff the header border entirely.
  */
  /* Accounts for 1px border */
  max-height: ${headerHeight ? headerHeight + 1 + 'px' : 'auto'};
  transition: max-height ${transitionDuration.slower}ms ease-in-out;
  &.open {
    max-height: ${height ? height + 'px' : 'auto'};
  }
`;

export const getHeaderStyles = (theme: Theme) => css`
  width: 100%;
  padding: ${spacing[150]}px ${spacing[300]}px;
  display: grid;
  grid-template-columns: auto 1fr;
  border-bottom: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
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
