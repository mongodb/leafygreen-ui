import {
  AbstractPosition,
  Alignment,
  Justification,
  RefPosition,
} from './Popover';

// Constructs the transform origin for any given pair of alignment / justification
export function getTransformOrigin({
  alignment,
  justification,
}: AbstractPosition): string {
  let x = '';
  let y = '';

  switch (alignment) {
    case Alignment.Left:
      x = 'right';
      break;

    case Alignment.Right:
      x = 'left';
      break;

    case Alignment.Bottom:
      y = 'top';
      break;

    case Alignment.Top:
      y = 'bottom';
      break;
  }

  switch (justification) {
    case Justification.Left:
      x = 'left';
      break;

    case Justification.Right:
      x = 'right';
      break;

    case Justification.Bottom:
      y = 'bottom';
      break;

    case Justification.Top:
      y = 'top';
      break;

    case Justification.CenterHorizontal:
      x = 'center';
      break;

    case Justification.CenterVertical:
      y = 'center';
      break;
  }

  return `${x} ${y}`;
}

// Get transform styles for position object
export function getTransform(
  alignment: Alignment,
  transformAmount: number,
): string {
  const scaleAmount = 0.8;

  switch (alignment) {
    case Alignment.Top:
      return `translate3d(0, ${transformAmount}px, 0) scale(${scaleAmount})`;

    case Alignment.Bottom:
      return `translate3d(0, -${transformAmount}px, 0) scale(${scaleAmount})`;

    case Alignment.Left:
      return `translate3d(${transformAmount}px, 0, 0) scale(${scaleAmount})`;

    case Alignment.Right:
      return `translate3d(-${transformAmount}px, 0, 0) scale(${scaleAmount})`;
  }
}

export const defaultElementPosition = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 0,
  width: 0,
};

// Gets top offset, left offset, width and height dimensions for a node
export function getElementPosition(element: HTMLElement | null): RefPosition {
  if (!element) {
    return defaultElementPosition;
  }

  const { top, bottom, left, right } = element.getBoundingClientRect();
  const { offsetHeight: height, offsetWidth: width } = element;

  return { top, bottom, left, right, height, width };
}
