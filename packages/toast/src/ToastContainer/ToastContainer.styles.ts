import { TransitionStatus } from 'react-transition-group';
import { mix } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { toastBGColor, toastHeight } from '../Toast/Toast.styles';

export const yOffset = 8;
export const gap = 4;

export const toastContainerStyles = css`
  /* outline: 1px solid teal; */
  position: fixed;
  left: ${spacing[3] - spacing[1]}px;
  bottom: ${spacing[3] - spacing[1]}px;
  width: 416px;
  min-height: ${toastHeight + yOffset}px;
  z-index: 0;

  perspective: 1600px;
  perspective-origin: bottom;
  transform-style: preserve-3d;
`;

export const getToastTransitionStyles = ({
  state,
  theme,
  index,
}: {
  state: TransitionStatus;
  theme: Theme;
  index: number;
}) => {
  switch (state) {
    case 'entered':
      return css`
        opacity: 1;
        z-index: ${3 - index};
        transform: translate3d(0, ${index * yOffset}px, -${index * 100}px)
          scale(1);
        background-color: ${mix(
          1 - index * 0.2,
          toastBGColor[theme],
          palette.white,
        )};
        // Slow down any hover animations
        transition-duration: ${transitionDuration.slower}ms;
      `;
    case 'entering':
      return css`
        transform: translate3d(0, ${yOffset}px, -100) scale(0.9);
        opacity: 0;
      `;
    case 'exited':
    case 'exiting':
      return css`
        transform: translate3d(0, -${yOffset}px, 100) scale(0.9);
        opacity: 0;
      `;
    default:
      return css`
        transform: translate3d(0, 0, 0) scale(1);
        opacity: 0;
      `;
  }
};

export const toastHoverStyles = ({
  index,
  theme,
}: {
  theme: Theme;
  index: number;
}) => {
  return css`
    background-color: ${toastBGColor[theme]};
    transform: translate3d(0, -${index * (toastHeight + gap)}px, 0);
  `;
};
