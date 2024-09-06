import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

export const TRANSITION_DURATION = transitionDuration.default;

export const contentClassName = createUniqueClassName('popover-content');

export const hiddenPlaceholderStyle = css`
  display: none;
`;

const getBasePopoverStyles = (hidePopover: boolean, spacing: number) => css`
  margin: 0;
  border: none;
  padding: 0;
  overflow: visible;
  width: max-content;

  transition-property: opacity, transform, display, visibility;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  transition-behavior: allow-discrete;

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
  &[data-placement='center'] {
    transform-origin: center;
  }
  &[data-placement='center-start'] {
    transform-origin: top;
  }
  &[data-placement='center-end'] {
    transform-origin: bottom;
  }

  // placement aware transform
  &[data-state='exited'][data-placement^='top'],
  &[data-state='exiting'][data-placement^='top'],
  &[data-state='close'][data-placement^='top'] {
    transform: translateY(${spacing}px) scale(0);
  }
  &[data-state='exited'][data-placement^='bottom'],
  &[data-state='exiting'][data-placement^='bottom'],
  &[data-state='close'][data-placement^='bottom'] {
    transform: translateY(-${spacing}px) scale(0);
  }
  &[data-state='exited'][data-placement^='left'],
  &[data-state='exiting'][data-placement^='left'],
  &[data-state='close'][data-placement^='left'] {
    transform: translateX(${spacing}px) scale(0);
  }
  &[data-state='exited'][data-placement^='right'],
  &[data-state='exiting'][data-placement^='right'],
  &[data-state='close'][data-placement^='right'] {
    transform: translateX(-${spacing}px) scale(0);
  }
  &[data-state='exited'][data-placement^='center'],
  &[data-state='exiting'][data-placement^='center'],
  &[data-state='close'][data-placement^='center'] {
    transform: scale(0);
  }

  // closed state
  &[data-state='exited'],
  /* &[data-state='exiting'], */
  &[data-state='close'] {
    opacity: 0;
  }

  // open state
  /* &[data-state='entering'], */
  &[data-state='entered'] {
    pointer-events: initial;
    opacity: 1;
  }
`;

export const getPopoverStyles = ({
  className,
  floatingStyles,
  hidePopover = false,
  popoverZIndex,
  spacing,
}: {
  className?: string;
  floatingStyles: React.CSSProperties;
  hidePopover?: boolean;
  popoverZIndex?: number;
  spacing: number;
}) =>
  cx(
    // @ts-expect-error
    css(floatingStyles),
    getBasePopoverStyles(hidePopover, spacing),
    {
      [css`
        z-index: ${popoverZIndex};
      `]: typeof popoverZIndex === 'number',
    },
    className,
  );
