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

  position: ${floatingStyles.position};
  top: ${floatingStyles.top}px;
  left: ${floatingStyles.left}px;

  transition-property: opacity, transform;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  transition-behavior: allow-discrete;
  opacity: 0;
  transform: scale(0);
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

const getClosedStyles = (placement: ExtendedPlacement, spacing: number) => {
  if (placement.startsWith('top')) {
    return css`
      opacity: 0;
      transform: translateY(${spacing}px) scale(0);
    `;
  }

  if (placement.startsWith('bottom')) {
    return css`
      opacity: 0;
      transform: translateY(-${spacing}px) scale(0);
    `;
  }

  if (placement.startsWith('left')) {
    return css`
      opacity: 0;
      transform: translateX(${spacing}px) scale(0);
    `;
  }

  if (placement.startsWith('right')) {
    return css`
      opacity: 0;
      transform: translateX(-${spacing}px) scale(0);
    `;
  }

  return css`
    opacity: 0;
    transform: scale(0);
  `;
};

const getOpenStyles = (placement: ExtendedPlacement) => {
  if (placement.startsWith('top')) {
    return css`
      opacity: 1;
      pointer-events: initial;
      transform: translateY(0) scale(1);
    `;
  }

  if (placement.startsWith('bottom')) {
    return css`
      opacity: 1;
      pointer-events: initial;
      transform: translateY(0) scale(1);
    `;
  }

  if (placement.startsWith('left')) {
    return css`
      opacity: 1;
      pointer-events: initial;
      transform: translateX(0) scale(1);
    `;
  }

  if (placement.startsWith('right')) {
    return css`
      opacity: 1;
      pointer-events: initial;
      transform: translateX(0) scale(1);
    `;
  }

  return css`
    opacity: 1;
    pointer-events: initial;
    transform: scale(1);
  `;
};

const getTransitionStyles = (
  placement: ExtendedPlacement,
  spacing: number,
) => ({
  exited: getClosedStyles(placement, spacing),
  entering: getClosedStyles(placement, spacing),
  entered: getOpenStyles(placement),
  exiting: getClosedStyles(placement, spacing),
  unmounted: getClosedStyles(placement, spacing),
});

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
    getBasePopoverStyles(floatingStyles),
    transformOriginStyles[placement],
    getTransitionStyles(placement, spacing)[state],

    {
      [css`
        z-index: ${popoverZIndex};
      `]: typeof popoverZIndex === 'number',
    },
    className,
  );
