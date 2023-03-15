import { TransitionStatus } from 'react-transition-group';
import { mix } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { TOAST } from '../../constants';
import { toastBGColor } from '../../InternalToast';

import { calcTotalStackHeight } from './useToastHeights';

export const toastContainerStyles = css`
  /* outline: 1px solid teal; */
  position: fixed;
  left: ${spacing[3] - TOAST.inset}px;
  bottom: ${spacing[3] - TOAST.inset}px;
  width: ${TOAST.width + 2 * TOAST.inset}px;
  min-height: ${TOAST.minHeight + TOAST.yOffset}px;
  max-height: calc(100vh - ${spacing[3]}px);
  z-index: 0;
  overflow: unset;

  perspective: 1600px;
  perspective-origin: bottom;
  transform-style: preserve-3d;
  transition: ease-in-out ${transitionDuration.default}ms;
  transition-property: transform, bottom, height;

  /* Scrollbars */
  scroll-behavior: unset; // _not_ smooth. We need this to be instant
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and old Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
`;

export function getContainerStatefulStyles({
  recentToastsLength,
  isHovered,
  isExpanded,
  shouldExpand,
  totalStackHeight,
  topToastHeight,
  bottomOffset,
}: {
  recentToastsLength: number;
  isHovered: boolean;
  isExpanded: boolean;
  shouldExpand: boolean;
  totalStackHeight: number;
  topToastHeight: number;
  bottomOffset: number;
}) {
  const isInteracted = isHovered || isExpanded;

  return cx(
    css`
      // The height of the first toast + inset
      height: ${TOAST.inset * 2 + topToastHeight}px;

      // Move the entire container as toasts get added,
      // so the bottom toast is always 16px from the bottom
      transform: translateY(-${TOAST.yOffset * (recentToastsLength - 1)}px);
    `,
    {
      [css`
        // set the container back when hovered/expanded
        transform: translateY(0);
        height: ${TOAST.inset * 2 + bottomOffset + totalStackHeight}px;
      `]: isInteracted,

      [css`
        // We want auto scroll bars when expanded
        height: 100vh;
        overflow: auto;
      `]: shouldExpand,
    },
  );
}

export const scrollContainerStyles = css`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: ${TOAST.minHeight + TOAST.yOffset}px;
  transform-style: inherit;
`;

export function scrollContainerExpandedStyles(totalStackHeight: number) {
  return css`
    position: relative;
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
      const y = index * TOAST.yOffset;
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
        transform: translate3d(0, ${TOAST.yOffset}px, -100px) scale(0.9);
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
    max-height: ${topToastHeight}px;
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
