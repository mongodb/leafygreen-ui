import { TransitionStatus } from 'react-transition-group';
import { mix } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import {
  gap,
  shortStackCount,
  toastHeight,
  toastInset,
  toastWidth,
  yOffset,
} from '../../constants';
import { toastBGColor } from '../../InternalToast';

export const toastContainerStyles = css`
  outline: 1px solid teal;
  position: fixed;
  left: ${spacing[3] - toastInset}px;
  bottom: ${spacing[3] - toastInset}px;
  width: ${toastWidth + 2 * toastInset}px;
  min-height: ${toastHeight + yOffset}px;
  z-index: 0;

  perspective: 1600px;
  perspective-origin: bottom;
  transform-style: preserve-3d;
  transition: transform ease-in-out ${transitionDuration.default}ms;
`;

export function getContainerStatefulStyles({
  recentToastsLength,
  isHovered,
  topToastHeight,
}: {
  recentToastsLength: number;
  isHovered: boolean;
  topToastHeight: number;
}) {
  return css`
    // The height of the first toast + inset
    height: ${toastInset * 2 + topToastHeight ?? toastHeight}px;

    // The whole thing moves as toasts get added
    // so the bottom toast is always 16px from the bottom
    transform: translateY(
      -${isHovered ? 0 : yOffset * (recentToastsLength - 1)}px
    );
  `;
}

export function getContainerHoverStyles({
  toastHeights,
  bottomOffset,
}: {
  toastHeights: Array<number>;
  bottomOffset: number;
}) {
  // the combined heights of visible toasts
  const combinedHeight = toastHeights.reduce(
    (sum, x, i) => (i < shortStackCount ? sum + x + gap : sum),
    0,
  );
  return css`
    height: ${toastInset * 2 + bottomOffset + combinedHeight}px;
  `;
}

/**
 * Stateful Toast styling
 */
export function getToastTransitionStyles({
  state,
  theme,
  indexFromTop,
}: {
  state: TransitionStatus;
  theme: Theme;
  indexFromTop: number;
}) {
  switch (state) {
    case 'entered':
      return css`
        opacity: 1;
        z-index: ${3 - indexFromTop};
        transform: translate3d(
            0,
            ${indexFromTop * yOffset}px,
            -${indexFromTop * 100}px
          )
          scale(1);
        background-color: ${mix(
          1 - indexFromTop * 0.2,
          toastBGColor[theme],
          palette.white,
        )};
        // Slow down any hover animations
        transition-duration: ${transitionDuration.slower}ms;
      `;

    default:
      return css`
        transform: translate3d(0, ${yOffset}px, -100px) scale(0.9);
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
  * Set the max-height of all toasts
  * to the height of the top-most toast
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
}: {
  toastHeights: Array<number>;
  theme: Theme;
  index: number;
  bottomOffset: number;
}) {
  const hoveredYPosition =
    toastHeights.reduce(
      (sum, x, j) =>
        // if the comparing toast is below the current toast
        // but also less than the shortStackCount
        // add that toast's height to this toast's offset
        j > index && j < shortStackCount ? sum + x + gap : sum,
      0,
    ) + bottomOffset;

  return css`
    max-height: ${toastHeights[index] * 2}px;
    background-color: ${toastBGColor[theme]};
    transform: translate3d(0, -${hoveredYPosition}px, 0);
  `;
}
