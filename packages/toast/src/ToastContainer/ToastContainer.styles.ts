import { TransitionStatus } from 'react-transition-group';
import { mix } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { TOAST_CONSTANTS } from '../constants';
import { toastBGColor } from '../InternalToast';

import { calcTotalStackHeight } from './utils/useToastHeights';

export const toastContainerStyles = css`
  outline: 1px solid teal;

  position: fixed;
  left: ${spacing[3] - TOAST_CONSTANTS.inset}px;
  bottom: ${spacing[3] - TOAST_CONSTANTS.inset}px;
  width: ${TOAST_CONSTANTS.width + 2 * TOAST_CONSTANTS.inset}px;
  max-height: calc(100vh - ${spacing[3]}px);
  z-index: 0;
  overflow: unset;

  // Hide the toast initially
  min-height: ${0}px;
  opacity: 0;
  visibility: hidden;

  perspective: 1600px;
  perspective-origin: bottom;
  transform-style: preserve-3d;
  transition: ease-in-out ${transitionDuration.default}ms;
  transition-property: transform, bottom, height, opacity;

  /* Scrollbars */
  scroll-behavior: unset; // _not_ smooth. We need this to be instant
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and old Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
`;

export const toastContainerVisibleStyles = css`
  opacity: 1;
  visibility: visible;
`;

export function getContainerStatefulStyles({
  recentToastsLength,
  topToastHeight,
}: {
  recentToastsLength: number;
  topToastHeight: number;
}) {
  return css`
    // In the default state, the container is the height of the first toast + inset
    height: ${topToastHeight + TOAST_CONSTANTS.inset * 2}px;

    // Move the entire container up as toasts get added,
    // so the bottom toast is always 16px from the bottom
    // (note, recentToastsLength should never exceed 3 )
    transform: translateY(
      -${TOAST_CONSTANTS.yOffset * (recentToastsLength - 1)}px
    );
  `;
}

export const getContainerInteractedStyles = ({
  totalStackHeight,
  bottomOffset,
}: {
  totalStackHeight: number;
  bottomOffset: number;
}) => {
  // Set the height of the container to the total stack height
  const height = bottomOffset + totalStackHeight + TOAST_CONSTANTS.inset * 2;

  return css`
    height: ${height}px;
    // set the container back when hovered/expanded
    transform: translateY(0);
  `;
};

export const containerExpandedStyles = css`
  // When expanded,
  // force the height to 100vh regardless of the total stack height
  height: 100vh;
  bottom: 0;
  overflow: auto;
`;

/**
 * Scroll Container
 */
export const scrollContainerStyles = css`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: ${TOAST_CONSTANTS.minHeight + TOAST_CONSTANTS.yOffset}px;
  transform-style: inherit;
`;

export function scrollContainerExpandedStyles(totalStackHeight: number) {
  /*
   * Scroll container should be at least the height of the stack, (plus padding)
   * This may overflow the container.
   */
  return css`
    min-height: ${totalStackHeight + spacing[3]}px;
  `;
}

/**
 * Stateful Toast styling
 */
export function getToastTransitionStyles({
  state,
  theme,
  index,
}: {
  state: TransitionStatus;
  theme: Theme;
  index: number;
}) {
  switch (state) {
    case 'entered': {
      const y = index * TOAST_CONSTANTS.yOffset;
      const z = -index * 100;
      const bgColor = mix(1 - index * 0.2, toastBGColor[theme], palette.white);

      return css`
        opacity: 1;
        z-index: ${3 - index};
        transform: translate3d(0, ${y}px, ${z}px) scale(1);
        background-color: ${bgColor};
        // Slow down any hover animations
        transition-duration: ${transitionDuration.slower}ms;
      `;
    }

    default:
      return css`
        transform: translate3d(0, ${TOAST_CONSTANTS.yOffset}px, -100px)
          scale(0.9);
        opacity: 0;
      `;
  }
}

export function getToastUnhoveredStyles({
  theme,
  index,
  topToastHeight,
}: {
  theme: Theme;
  index: number;
  topToastHeight: number;
}) {
  return css`
    /**
    * When not hovered,
    * Set the max-height of each toast to the height of the top-most toast
    * so tall toasts below the top don't peek out
    */
    max-height: ${index === 0 ? 'unset' : `${topToastHeight}px`};
    color: ${index > 0 ? toastBGColor[theme] : 'initial'} !important;
  `;
}

export function getToastHoverStyles({
  index,
  theme,
  bottomOffset,
  toastHeights,
  isExpanded,
}: {
  toastHeights: Array<number>;
  theme: Theme;
  index: number;
  bottomOffset: number;
  isExpanded: boolean;
}) {
  // The toast position when hovered
  const hoveredYPosition =
    calcTotalStackHeight(toastHeights, isExpanded, index) + bottomOffset;

  return css`
    max-height: ${toastHeights[index] * 2}px;
    background-color: ${toastBGColor[theme]};
    transform: translate3d(0, -${hoveredYPosition}px, 0);
  `;
}
