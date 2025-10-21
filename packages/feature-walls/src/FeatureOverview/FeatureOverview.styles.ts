import { css, cx } from '@leafygreen-ui/emotion';
import {
  breakpoints,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

const CONTAINER_MAX_WIDTH = 1040;
const TRANSITION_DURATION = transitionDuration.slowest;

export const cardStyles = css`
  max-width: ${CONTAINER_MAX_WIDTH}px;
  width: 100%;
  padding: ${spacing[800]}px;
`;

const baseSectionStyles = css`
  max-width: ${CONTAINER_MAX_WIDTH}px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${breakpoints.Tablet}px) {
    grid-template-columns: 1fr;
  }
`;

export const getSectionStyles = (className?: string) =>
  cx(baseSectionStyles, className);

export const textContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[600]}px;
`;

export const mediaCarouselContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const mediaCarouselStyles = css`
  position: relative;
  overflow: hidden;
  height: auto;
  transition: height ${TRANSITION_DURATION}ms ease-in-out;
`;

const baseMediaSlideStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  padding: 0 ${spacing[600]}px;
  transition-property: opacity, visibility;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  opacity: 0;
  visibility: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${breakpoints.Tablet}px) {
    padding: ${spacing[600]}px 0 0;
  }
`;

const mediaSlideActiveStyles = css`
  position: relative;
  opacity: 1;
  visibility: visible;
`;

export const getMediaSlideStyles = (isActive: boolean) =>
  cx(baseMediaSlideStyles, {
    [mediaSlideActiveStyles]: isActive,
  });
