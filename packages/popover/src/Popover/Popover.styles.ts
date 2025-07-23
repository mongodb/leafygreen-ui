import { TransitionStatus } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { ExtendedPlacement, TransformAlign } from './Popover.types';

const TRANSFORM_INITIAL_SCALE = 0.8;
export const TRANSITION_DURATION = transitionDuration.default;

export const contentClassName = createUniqueClassName('popover-content');

export const hiddenPlaceholderStyle = css`
  display: none;
`;

const basePopoverStyles = css`
  margin: 0;
  border: none;
  padding: 0;
  overflow: visible;
  background-color: transparent;
  width: max-content;

  transition-property: opacity, transform, overlay;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  transition-behavior: allow-discrete;

  opacity: 0;
  transform: scale(${TRANSFORM_INITIAL_SCALE});

  &::backdrop {
    transition-property: background, overlay;
    transition-duration: ${TRANSITION_DURATION}ms;
    transition-timing-function: ease-in-out;
    transition-behavior: allow-discrete;
  }
`;

const getPositionStyles = ({
  left,
  position,
  top,
}: {
  left: number;
  position: 'absolute' | 'fixed';
  top: number;
}) => css`
  left: ${left}px;
  position: ${position};
  top: ${top}px;
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

const baseClosedStyles = css`
  opacity: 0;
`;

const getClosedStyles = (spacing: number, transformAlign: TransformAlign) => {
  switch (transformAlign) {
    case TransformAlign.Top:
      return cx(
        baseClosedStyles,
        css`
          transform: translate3d(0, ${spacing}px, 0)
            scale(${TRANSFORM_INITIAL_SCALE});
        `,
      );
    case TransformAlign.Bottom:
      return cx(
        baseClosedStyles,
        css`
          transform: translate3d(0, -${spacing}px, 0)
            scale(${TRANSFORM_INITIAL_SCALE});
        `,
      );
    case TransformAlign.Left:
      return cx(
        baseClosedStyles,
        css`
          transform: translate3d(${spacing}px, 0, 0)
            scale(${TRANSFORM_INITIAL_SCALE});
        `,
      );
    case TransformAlign.Right:
      return cx(
        baseClosedStyles,
        css`
          transform: translate3d(-${spacing}px, 0, 0)
            scale(${TRANSFORM_INITIAL_SCALE});
        `,
      );
    case TransformAlign.Center:
    default:
      return cx(
        baseClosedStyles,
        css`
          transform: scale(${TRANSFORM_INITIAL_SCALE});
        `,
      );
  }
};

const baseOpenStyles = css`
  opacity: 1;
  pointer-events: initial;

  &:popover-open {
    opacity: 1;

    pointer-events: initial;
  }
`;

const getOpenStyles = (transformAlign: TransformAlign) => {
  switch (transformAlign) {
    case TransformAlign.Top:
    case TransformAlign.Bottom:
      return cx(
        baseOpenStyles,
        css`
          transform: translateY(0) scale(1);

          &:popover-open {
            transform: translateY(0) scale(1);
          }
        `,
      );
    case TransformAlign.Left:
    case TransformAlign.Right:
      return cx(
        baseOpenStyles,
        css`
          transform: translateX(0) scale(1);

          &:popover-open {
            transform: translateX(0) scale(1);
          }
        `,
      );
    case TransformAlign.Center:
    default:
      return cx(
        baseOpenStyles,
        css`
          transform: scale(1);

          &:popover-open {
            transform: scale(1);
          }
        `,
      );
  }
};

export const getPopoverStyles = ({
  className,
  left,
  placement,
  popoverZIndex,
  position,
  spacing,
  state,
  top,
  transformAlign,
}: {
  className?: string;
  left: number;
  placement: ExtendedPlacement;
  popoverZIndex?: number;
  position: 'absolute' | 'fixed';
  spacing: number;
  state: TransitionStatus;
  top: number;
  transformAlign: TransformAlign;
}) =>
  cx(
    basePopoverStyles,
    getPositionStyles({ left, position, top }),
    transformOriginStyles[placement],
    {
      [getClosedStyles(spacing, transformAlign)]: state !== 'entered',
      [getOpenStyles(transformAlign)]: state === 'entered',
      [css`
        z-index: ${popoverZIndex};
      `]: typeof popoverZIndex === 'number',
    },
    className,
  );
