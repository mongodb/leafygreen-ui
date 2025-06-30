import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import {
  addOverflowShadow,
  borderRadius,
  color,
  InteractionState,
  Side,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { TRANSITION_DURATION } from '../constants';

const BORDER_WIDTH = 1;

export const referenceWrapperClassName = createUniqueClassName(
  'context_drawer-reference_wrapper',
);

const baseOuterContainerStyles = css`
  display: flex;
  flex-direction: column;
`;

export const getOuterContainerStyles = ({
  className,
}: {
  className?: string;
}) => cx(baseOuterContainerStyles, className);

export const getInnerContainerStyles = ({ theme }: { theme: Theme }) => css`
  display: flex;
  flex-direction: column;
  border-radius: ${borderRadius[400]}px;
  border: ${BORDER_WIDTH}px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  border-bottom-width: 0;
  transition: border ${TRANSITION_DURATION}ms ease-in-out;
`;

/**
 * Negative margins are used to offset the border width of the inner container so
 * that the reference element and content element appear to be flush with the border.
 */
export const referenceWrapperStyles = cx(
  css`
    margin-top: -${BORDER_WIDTH}px;
    margin-left: -${BORDER_WIDTH}px;
    margin-right: -${BORDER_WIDTH}px;
  `,
  referenceWrapperClassName,
);

const contentWrapperStyles = css`
  position: relative;
  overflow: hidden;
  transition-property: height, opacity, visibility;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  height: 0;
  opacity: 0;
  visibility: hidden;

  :focus-visible {
    outline: none;
  }
`;

const getExpandedContentStyles = (height: string) => css`
  height: ${height};
  opacity: 1;
  visibility: visible;
`;

export const getContentWrapperStyles = ({
  hasBottomShadow,
  hasTopShadow,
  height,
  isOpen,
  theme,
}: {
  hasBottomShadow: boolean;
  hasTopShadow: boolean;
  height: string;
  isOpen: boolean;
  theme: Theme;
}) =>
  cx(contentWrapperStyles, {
    [getExpandedContentStyles(height)]: isOpen,
    [addOverflowShadow({ side: Side.Top, theme, isInside: true })]:
      hasTopShadow,
    [addOverflowShadow({ side: Side.Bottom, theme, isInside: true })]:
      hasBottomShadow,
  });

export const contentScrollContainerStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const bottomInterceptStyles = css`
  // Ensures bottom intercept is visible when end of scroll container is reached.
  padding-bottom: 1px;
`;

export const triggerWrapperStyles = css`
  display: flex;
  padding: 0 ${spacing[600]}px;
`;
