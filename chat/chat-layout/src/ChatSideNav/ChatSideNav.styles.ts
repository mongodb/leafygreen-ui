import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  addOverflowShadow,
  color,
  InteractionState,
  Side,
  Variant,
} from '@leafygreen-ui/tokens';

import {
  COLLAPSED_SIDE_NAV_WIDTH_WITH_BORDER,
  gridAreas,
  PINNED_SIDE_NAV_WIDTH_WITH_BORDER,
  SIDE_NAV_TRANSITION_DURATION,
} from '../constants';

const getBaseWrapperStyles = (theme: Theme) => css`
  grid-area: ${gridAreas.sideNav};
  border-right: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;

export const getWrapperStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => {
  return cx(getBaseWrapperStyles(theme), className);
};

const baseContainerStyles = css`
  position: relative;
  z-index: 1;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  transition: max-width ${SIDE_NAV_TRANSITION_DURATION}ms ease-in-out;
  max-width: ${PINNED_SIDE_NAV_WIDTH_WITH_BORDER}px;
`;

const collapsedContainerStyles = css`
  max-width: ${COLLAPSED_SIDE_NAV_WIDTH_WITH_BORDER}px;
`;

export const getContainerStyles = ({
  shouldRenderExpanded,
  showOverflowShadow,
  theme,
}: {
  shouldRenderExpanded: boolean;
  showOverflowShadow: boolean;
  theme: Theme;
}) =>
  cx(baseContainerStyles, {
    [collapsedContainerStyles]: !shouldRenderExpanded,
    [addOverflowShadow({ isInside: false, side: Side.Right, theme })]:
      showOverflowShadow,
  });
