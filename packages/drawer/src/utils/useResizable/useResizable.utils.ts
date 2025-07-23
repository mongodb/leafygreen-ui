import { DragFrom } from './useResizable.types';

/**
 * Calculates the new size based on mouse position and constraints
 */
export const calculateNewSize = (
  event: MouseEvent,
  initialElementSize: number,
  initialMousePosition: { x: number; y: number },
  dragDirection: DragFrom,
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
  switch (dragDirection) {
    case DragFrom.Left:
      newSize = initialElementSize - deltaX;
      break;
    case DragFrom.Right:
      newSize = initialElementSize + deltaX;
      break;
    case DragFrom.Top:
      newSize = initialElementSize - deltaY;
      break;
    case DragFrom.Bottom:
      newSize = initialElementSize + deltaY;
      break;
  }

  // Apply viewport percentage constraint if specified
  if (viewportPercentage) {
    const percent = viewportPercentage / 100;
    const viewportSize =
      dragDirection === DragFrom.Left || dragDirection === DragFrom.Right
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
