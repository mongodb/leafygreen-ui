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
  width: 100%;
  border: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  border-radius: ${borderRadius[200]}px;
  overflow: hidden;
  max-height: ${height ? height + 'px' : 'auto'};
  transition: max-height ${transitionDuration.slower}ms ease-in-out;
  &.collapsed {
    max-height: ${headerHeight ? headerHeight + 'px' : 'auto'};
  }
`;

export const getHeaderStyles = (theme: Theme) => css`
  border-top: none;
  /* border-bottom: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]}; */
`;
