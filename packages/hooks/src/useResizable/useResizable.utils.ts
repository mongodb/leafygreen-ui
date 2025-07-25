import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

import { Position } from './useResizable.types';
import { RESIZER_SIZE } from './useResizable.constants';

/**
 * Calculates the new size based on mouse position and constraints
 */
export const calculateNewSize = (
  event: MouseEvent,
  initialElementSize: number,
  initialMousePosition: { x: number; y: number },
  position: Position,
  minSize: number,
  maxSize: number,
  viewportPercentage?: number,
): number => {
  let newSize = initialElementSize;
  let effectiveMaxSize = maxSize;

  // Calculate delta
  const deltaX = event.clientX - initialMousePosition.x;
  const deltaY = event.clientY - initialMousePosition.y;

  // Apply direction-specific calculation
  switch (position) {
    case Position.Right:
      newSize = initialElementSize - deltaX;
      break;
    case Position.Left:
      newSize = initialElementSize + deltaX;
      break;
    case Position.Bottom:
      newSize = initialElementSize - deltaY;
      break;
    case Position.Top:
      newSize = initialElementSize + deltaY;
      break;
  }

  // Apply viewport percentage constraint if specified
  if (viewportPercentage) {
    const percent = viewportPercentage / 100;
    const viewportSize =
      position === Position.Left || position === Position.Right
        ? window.innerWidth
        : window.innerHeight;
    effectiveMaxSize = Math.min(effectiveMaxSize, viewportSize * percent);
  }

  if (newSize < minSize) {
    newSize = minSize;
  } else if (newSize > effectiveMaxSize) {
    newSize = effectiveMaxSize;
  }

  return newSize;
};

/**
 * Generates styles for the resizer element based on its orientation and resizing state
 */
export const getResizerStyles = (isVertical: boolean, isResizing: boolean) =>
  cx(
    css`
      cursor: ${isVertical ? 'col-resize' : 'row-resize'};
      background-color: transparent;

      &:hover,
      &:focus-visible {
        background-color: ${palette.blue.light1};
        outline: none;
      }
    `,
    {
      [css`
        width: ${RESIZER_SIZE}px;
        height: 100%;
      `]: isVertical,
      [css`
        height: ${RESIZER_SIZE}px;
        width: 100%;
      `]: !isVertical,
      [css`
        background-color: ${palette.blue.light1};
      `]: isResizing,
    },
  );

/**
 * Generates ARIA attributes for the resizer element
 */
export const getResizerAriaAttributes = (
  size: number,
  minSize: number,
  maxSize: number,
  isVertical: boolean,
) => {
  return {
    role: 'separator', // Defines the element as an interactive divider that separates content regions.
    'aria-valuenow': size, // Represents the current position of the separator as a value between aria-valuemin and aria-valuemax.
    'aria-valuemin': minSize, //The minimum value of the separator's range.
    'aria-valuemax': maxSize, // The maximum value of the separator's range.
    'aria-orientation': isVertical ? 'vertical' : 'horizontal', // The visual orientation of the separator bar.
    'aria-label': `${isVertical ? 'Vertical' : 'Horizontal'} resize handle`, // Descriptive label
    'aria-valuetext': `${size} pixels`, // Provide size in a more readable format
  };
};
