import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

export const getWrapperStyles = (
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
  max-height: ${height ? height + 'px' : 'auto'};
  transition: max-height ${transitionDuration.slower}ms ease-in-out;
  &.collapsed {
    /* Accounts for 1px border */
    max-height: ${headerHeight ? headerHeight + 1 + 'px' : 'auto'};
  }
`;

export const getHeaderStyles = () => css`
  /* Top border is wrapper border */
  border-top: none;
`;
