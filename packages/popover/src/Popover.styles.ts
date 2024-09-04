import { css, cx } from '@leafygreen-ui/emotion';
import { transitionDuration } from '@leafygreen-ui/tokens';

export const TRANSITION_DURATION = transitionDuration.default;

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
  &[data-status='unmounted'][data-placement^='top'],
  &[data-status='initial'][data-placement^='top'],
  &[data-status='close'][data-placement^='top'] {
    transform: translateY(${spacing}px) scale(0);
  }
  &[data-status='unmounted'][data-placement^='bottom'],
  &[data-status='initial'][data-placement^='bottom'],
  &[data-status='close'][data-placement^='bottom'] {
    transform: translateY(-${spacing}px) scale(0);
  }
  &[data-status='unmounted'][data-placement^='left'],
  &[data-status='initial'][data-placement^='left'],
  &[data-status='close'][data-placement^='left'] {
    transform: translateX(${spacing}px) scale(0);
  }
  &[data-status='unmounted'][data-placement^='right'],
  &[data-status='initial'][data-placement^='right'],
  &[data-status='close'][data-placement^='right'] {
    transform: translateX(-${spacing}px) scale(0);
  }
  &[data-status='unmounted'][data-placement^='center'],
  &[data-status='initial'][data-placement^='center'],
  &[data-status='close'][data-placement^='center'] {
    transform: scale(0);
  }

  // closed state
  &[data-status='unmounted'],
  &[data-status='initial'],
  &[data-status='close'] {
    opacity: 0;
  }

  // open state
  &[data-status='open'] {
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
