import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import {
  COLLAPSED_SIDE_NAV_WIDTH,
  PINNED_SIDE_NAV_WIDTH,
  SIDE_NAV_TRANSITION_DURATION,
} from '../../constants';

/**
 * Adding 1px to the height due to the border being included in the height
 * when `box-sizing: border-box` is used
 */
const CONTENT_HEADER_HEIGHT = 48 + 1;
const ICON_SIZE = 16;

const getBaseContentStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 0;
  max-width: ${PINNED_SIDE_NAV_WIDTH}px;
  transition: max-width ${SIDE_NAV_TRANSITION_DURATION}ms ease-in-out;
`;

const collapsedContentStyles = css`
  max-width: ${COLLAPSED_SIDE_NAV_WIDTH}px;
`;

export const getContentStyles = ({
  className,
  shouldRenderExpanded,
  theme,
}: {
  className?: string;
  shouldRenderExpanded: boolean;
  theme: Theme;
}) =>
  cx(
    getBaseContentStyles(theme),
    {
      [collapsedContentStyles]: !shouldRenderExpanded,
    },
    className,
  );

const baseContentHeaderStyles = css`
  overflow: hidden;
  height: ${CONTENT_HEADER_HEIGHT}px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding: 0 ${spacing[400]}px;
  display: grid;
  align-items: center;
  gap: ${spacing[200]}px;
  transition: grid-template-columns ${SIDE_NAV_TRANSITION_DURATION}ms
      ease-in-out,
    border-bottom-color ${SIDE_NAV_TRANSITION_DURATION}ms ease-in-out;
  grid-template-columns: ${ICON_SIZE}px auto;
  border-bottom-color: transparent;
`;

const getCollapsedContentHeaderStyles = (theme: Theme) => css`
  grid-template-columns: ${ICON_SIZE}px 0fr;
  border-bottom-color: ${color[theme].border[Variant.Secondary][
    InteractionState.Default
  ]};
`;

export const getContentHeaderStyles = ({
  shouldRenderExpanded,
  theme,
}: {
  shouldRenderExpanded: boolean;
  theme: Theme;
}) =>
  cx(baseContentHeaderStyles, {
    [getCollapsedContentHeaderStyles(theme)]: !shouldRenderExpanded,
  });

export const getIconFill = (theme: Theme) =>
  color[theme].icon[Variant.Primary][InteractionState.Default];

const getBaseOverlineStyles = (theme: Theme) => css`
  width: 200px;
  color: ${color[theme].text[Variant.Secondary][InteractionState.Default]};
  opacity: 1;
  transition-property: opacity;
  transition-duration: ${SIDE_NAV_TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
`;

const hiddenOverlineStyles = css`
  opacity: 0;
`;

export const getOverlineStyles = ({
  shouldRender,
  theme,
}: {
  shouldRender: boolean;
  theme: Theme;
}) =>
  cx(getBaseOverlineStyles(theme), {
    [hiddenOverlineStyles]: !shouldRender,
  });
