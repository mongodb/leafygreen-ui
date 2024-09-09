import { TransitionStatus } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { ExtendedPlacement } from './Popover.types';

export const TRANSITION_DURATION = transitionDuration.default;

export const contentClassName = createUniqueClassName('popover-content');

export const hiddenPlaceholderStyle = css`
  display: none;
`;

const getBasePopoverStyles = (floatingStyles: React.CSSProperties) => css`
  margin: 0;
  border: none;
  padding: 0;
  overflow: visible;
  width: max-content;

  position: ${floatingStyles.position};
  top: ${floatingStyles.top}px;
  left: ${floatingStyles.left}px;

  transition-property: opacity, transform;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  transition-behavior: allow-discrete;
`;

const transformOriginStyles: Record<ExtendedPlacement, string> = {
  top: css`
    transform-origin: bottom;
  `,
  'top-start': css`
    transform-origin: bottom left;
  `,
  'top-end': css`
    transform-origin: bottom right;
  `,
  bottom: css`
    transform-origin: top;
  `,
  'bottom-start': css`
    transform-origin: top left;
  `,
  'bottom-end': css`
    transform-origin: top right;
  `,
  left: css`
    transform-origin: right;
  `,
  'left-start': css`
    transform-origin: right top;
  `,
  'left-end': css`
    transform-origin: right bottom;
  `,
  right: css`
    transform-origin: left;
  `,
  'right-start': css`
    transform-origin: left top;
  `,
  'right-end': css`
    transform-origin: left bottom;
  `,
  center: css`
    transform-origin: center;
  `,
  'center-start': css`
    transform-origin: top;
  `,
  'center-end': css`
    transform-origin: bottom;
  `,
};

const getTransformStyles = (placement: ExtendedPlacement, spacing: number) =>
  cx({
    [css`
      transform: translateY(${spacing}px) scale(0);
    `]: placement.startsWith('top'),
    [css`
      transform: translateY(-${spacing}px) scale(0);
    `]: placement.startsWith('bottom'),
    [css`
      transform: translateX(${spacing}px) scale(0);
    `]: placement.startsWith('left'),
    [css`
      transform: translateX(-${spacing}px) scale(0);
    `]: placement.startsWith('right'),
    [css`
      transform: scale(0);
    `]: placement.startsWith('center'),
  });

const closedStyles = css`
  opacity: 0;
`;

const openStyles = css`
  opacity: 1;
  pointer-events: initial;
`;

export const getPopoverStyles = ({
  className,
  floatingStyles,
  placement,
  popoverZIndex,
  spacing,
  state,
}: {
  className?: string;
  floatingStyles: React.CSSProperties;
  placement: ExtendedPlacement;
  popoverZIndex?: number;
  spacing: number;
  state: TransitionStatus;
}) =>
  cx(
    className,
    getBasePopoverStyles(floatingStyles),
    transformOriginStyles[placement],
    {
      [getTransformStyles(placement, spacing)]:
        state === 'exiting' || state === 'entering',
      [closedStyles]: state === 'exiting' || state === 'exited',
      [openStyles]: state === 'entering' || state === 'entered',
      [css`
        z-index: ${popoverZIndex};
      `]: typeof popoverZIndex === 'number',
    },
  );
