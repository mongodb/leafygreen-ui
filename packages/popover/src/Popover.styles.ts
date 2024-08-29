import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

export const TRANSITION_DURATION = transitionDuration.slowest;

export const contentClassName = createUniqueClassName('popover-content');

export const hiddenPlaceholderStyle = css`
  display: none;
`;

const getBasePopoverStyles = (
  floatingStyles: React.CSSProperties,
  hidePopover: boolean,
  spacing: number,
) => css`
  margin: 0;
  border: none;
  padding: 0;
  overflow: visible;
  width: max-content;

  transition-property: opacity, transform, overlay, display, visibility;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  transition-behavior: allow-discrete;

  &::backdrop {
    transition-property: background, overlay, display;
    transition-duration: ${TRANSITION_DURATION}ms;
    transition-timing-function: ease-in-out;
    transition-behavior: allow-discrete;
  }

  visibility: ${hidePopover ? 'hidden' : 'visible'};

  // placement aware transform origin
  &[data-placement='top'] {
    transform-origin: bottom;
  }
  &[data-placement='top-start'] {
    transform-origin: bottom left;
  }
  &[data-placement='top-end'] {
    transform-origin: bottom right;
  }
  &[data-placement='bottom'] {
    transform-origin: top;
  }
  &[data-placement='bottom-start'] {
    transform-origin: top left;
  }
  &[data-placement='bottom-end'] {
    transform-origin: top right;
  }
  &[data-placement='left'] {
    transform-origin: right;
  }
  &[data-placement='left-start'] {
    transform-origin: right top;
  }
  &[data-placement='left-end'] {
    transform-origin: right bottom;
  }
  &[data-placement='right'] {
    transform-origin: left;
  }
  &[data-placement='right-start'] {
    transform-origin: left top;
  }
  &[data-placement='right-end'] {
    transform-origin: left bottom;
  }

  // placement aware transform
  &[data-status='unmounted'][data-placement^='top'] {
    transform: translateY(${spacing}px) scale(0);
  }
  &[data-status='unmounted'][data-placement^='bottom'] {
    transform: translateY(-${spacing}px) scale(0);
  }
  &[data-status='unmounted'][data-placement^='left'] {
    transform: translateX(${spacing}px) scale(0);
  }
  &[data-status='unmounted'][data-placement^='right'] {
    transform: translateX(-${spacing}px) scale(0);
  }

  // initial state
  &[data-status='unmounted'] {
    opacity: 0;
  }

  // close state
  &[data-status='open'],
  &:popover-open {
    pointer-events: initial;
    opacity: 1;
  }

  // need this (add link)
  @starting-style {
    &:popover-open {
      opacity: 0;
    }
  }
`;

export const getPopoverStyles = ({
  className,
  floatingStyles,
  hidePopover = false,
  spacing,
}: {
  className?: string;
  floatingStyles: React.CSSProperties;
  hidePopover?: boolean;
  spacing: number;
}) => {
  return cx(
    // @ts-ignore
    css(floatingStyles),
    getBasePopoverStyles(floatingStyles, hidePopover, spacing),
    className,
  );
};
