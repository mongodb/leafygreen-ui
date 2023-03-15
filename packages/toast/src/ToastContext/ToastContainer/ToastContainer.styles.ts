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
  left: ${spacing[3] - TOAST.toastInset}px;
  bottom: ${spacing[3] - TOAST.toastInset}px;
  width: ${TOAST.toastWidth + 2 * TOAST.toastInset}px;
  min-height: ${TOAST.toastHeight + TOAST.yOffset}px;
  max-height: calc(100vh - ${spacing[3]}px);
  z-index: 0;
  scroll-behavior: unset; // Not smooth

  perspective: 1600px;
  perspective-origin: bottom;
  transform-style: preserve-3d;
  transition: transform ease-in-out ${transitionDuration.default}ms;
`;

export function getContainerStatefulStyles({
  recentToastsLength,
  isHovered,
  isExpanded,
  toastHeights,
  bottomOffset,
}: {
  recentToastsLength: number;
  isHovered: boolean;
  isExpanded: boolean;
  toastHeights: Array<number>;
  bottomOffset: number;
}) {
  const isInteracted = isHovered || isExpanded;
  const topToastHeight = toastHeights[0];
  // the combined heights of visible toasts
  const combinedHeight = calcTotalStackHeight(toastHeights, isExpanded);

  return cx(
    css`
      // The height of the first toast + inset
      height: ${TOAST.toastInset * 2 + topToastHeight ?? TOAST.toastHeight}px;

      // Move the entire container as toasts get added,
      // so the bottom toast is always 16px from the bottom
      transform: translateY(-${TOAST.yOffset * (recentToastsLength - 1)}px);
    `,
    {
      [css`
        // set the container back when hovered/expanded
        transform: translateY(0);
        height: ${TOAST.toastInset * 2 + bottomOffset + combinedHeight + 'px'};

        // We want auto scroll bars when expanded
        overflow: ${isExpanded ? 'auto' : 'unset'};
      `]: isInteracted,
    },
  );
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
    case 'entered':
      return css`
        opacity: 1;
        z-index: ${3 - index};
        transform: translate3d(0, ${index * TOAST.yOffset}px, -${index * 100}px)
          scale(1);
        background-color: ${mix(
          1 - index * 0.2,
          toastBGColor[theme],
          palette.white,
        )};
        // Slow down any hover animations
        transition-duration: ${transitionDuration.slower}ms;
      `;

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
  toastHeights,
}: {
  theme: Theme;
  index: number;
  toastHeights: Array<number>;
}) {
  return css`
    /**
    * When not hovered,
    * Set the max-height of each toast to the height of the top-most toast
    * so tall toasts below the top don't peek out
    */
    max-height: ${toastHeights[0]}px;
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
