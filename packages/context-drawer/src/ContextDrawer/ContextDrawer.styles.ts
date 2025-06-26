import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
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

const baseOuterContainerStyles = css`
  display: flex;
  flex-direction: column;
`;

export const getOuterContainerStyles = ({
  className,
}: {
  className?: string;
}) => cx(baseOuterContainerStyles, className);

const baseInnerContainerStyles = css`
  display: flex;
  flex-direction: column;
  border-radius: ${borderRadius[400]}px;
  border: 1px solid transparent;
  border-bottom-width: 0;
  transition: border ${TRANSITION_DURATION}ms ease-in-out;
`;

const getOpenContainerStyles = ({ theme }: { theme: Theme }) => css`
  border: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
`;

export const getInnerContainerStyles = ({
  showBorder,
  theme,
}: {
  showBorder: boolean;
  theme: Theme;
}) =>
  cx(baseInnerContainerStyles, {
    [getOpenContainerStyles({ theme })]: showBorder,
  });

const contentWrapperStyles = css`
  position: relative;
  overflow: hidden;
  transition-property: height, opacity;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  height: 0;
  opacity: 0;
  visibility: hidden;

  :focus-visible {
    outline: none;
  }
`;

const getExpandedContentStyles = (height: number | string) => {
  const expandedHeight = typeof height === 'number' ? `${height}px` : height;
  return css`
    height: ${expandedHeight};
    opacity: 1;
    visibility: visible;
  `;
};

export const getContentWrapperStyles = ({
  hasBottomShadow,
  hasTopShadow,
  height,
  isOpen,
  theme,
}: {
  hasBottomShadow: boolean;
  hasTopShadow: boolean;
  height: number | string;
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
  padding-bottom: ${spacing[25]}px;
`;

export const triggerWrapperStyles = css`
  display: flex;
  padding: 0 ${spacing[600]}px;
`;
