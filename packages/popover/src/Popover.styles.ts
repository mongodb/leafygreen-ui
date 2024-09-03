import { TransitionStatus } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { AbsolutePositionObject } from './utils/positionUtils';

export const TRANSITION_DURATION = transitionDuration.default;

export const contentClassName = createUniqueClassName('popover-content');

export const hiddenPlaceholderStyle = css`
  display: none;
`;

type PositionCSS = AbsolutePositionObject & { transformOrigin: string };

const getBasePopoverStyles = (positionCSS: PositionCSS) => css`
  position: absolute;
  top: ${positionCSS.top};
  left: ${positionCSS.left};
  right: ${positionCSS.right};
  bottom: ${positionCSS.bottom};
  transform-origin: ${positionCSS.transformOrigin};
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
  positionCSS: PositionCSS;
  state: TransitionStatus;
  transform: string;
  usePortal: boolean;
}) =>
  cx(
    getBasePopoverStyles(positionCSS),
    {
      [css`
        transform: ${transform};
      `]: state === 'entering' || state === 'exiting',
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
