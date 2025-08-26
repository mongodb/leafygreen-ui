import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

/**
 * The length of the box shadow for the RichLink component that
 * renders when a link is hovered.
 */
const LINK_BOX_SHADOW_LENGTH = 4;
const TRANSITION_DURATION = transitionDuration.slower;

export const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

export const headerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;
`;

const baseIconStyles = css`
  transition: transform ${TRANSITION_DURATION}ms ease-in-out;
  transform: rotate(0deg);
`;

const expandedIconStyles = css`
  transform: rotate(180deg);
`;

export const getIconStyles = (isExpanded: boolean) =>
  cx(baseIconStyles, {
    [expandedIconStyles]: isExpanded,
  });

const baseLinksWrapperStyles = css`
  display: grid;
  padding-top: ${spacing[100]}px;
  transition-property: height, grid-template-rows, opacity, visibility;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  grid-template-rows: 0fr;
  opacity: 0;
  visibility: hidden;
`;

const expandedLinksWrapperStyles = css`
  grid-template-rows: 1fr;
  opacity: 1;
  visibility: visible;
`;

export const getLinksWrapperStyles = (isExpanded: boolean) =>
  cx(baseLinksWrapperStyles, {
    [expandedLinksWrapperStyles]: isExpanded,
  });

export const linksInnerWrapperStyles = css`
  overflow: hidden;
  margin: -${LINK_BOX_SHADOW_LENGTH}px;
  padding: ${LINK_BOX_SHADOW_LENGTH}px;
`;
