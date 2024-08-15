import { TransitionStatus } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

export const TRANSITION_DURATION = transitionDuration.default;

export const contentClassName = createUniqueClassName('popover-content');

export const hiddenPlaceholderStyle = css`
  display: none;
`;

const basePopoverStyles = css`
  position: absolute;
  transition-property: opacity, transform;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  opacity: 0;
`;

const getActiveStyles = (usePortal: boolean) => css`
  opacity: 1;
  position: ${usePortal ? '' : 'absolute'};
  pointer-events: initial;
`;

export const getPopoverStyles = ({
  className,
  popoverZIndex,
  positionCSS,
  state,
  transform,
  usePortal,
}: {
  className?: string;
  popoverZIndex?: number;
  positionCSS: any;
  state: TransitionStatus;
  transform: any;
  usePortal: boolean;
}) =>
  cx(
    basePopoverStyles,
    css(positionCSS),
    {
      [css({ transform })]: state === 'entering' || state === 'exiting',
      [getActiveStyles(usePortal)]: state === 'entered',
      [css`
        z-index: ${popoverZIndex};
      `]: typeof popoverZIndex === 'number',
    },
    className,
    {
      [css`
        transition-delay: 0ms;
      `]: state === 'exiting',
    },
  );
