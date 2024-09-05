import { Placement } from '@floating-ui/react';

import {
  Align,
  ElementPosition,
  ExtendedPlacement,
  Justify,
} from '../Popover.types';

const defaultElementPosition = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 0,
  width: 0,
};

/**
 * Returns the width and height as well as the top, bottom, left, and right positions of an element.
 */
const getElementPosition = (element: HTMLElement, isReference?: boolean) => {
  const {
    top,
    bottom,
    left,
    right,
    width: boundingWidth,
  } = element.getBoundingClientRect();
  const { offsetHeight: height } = element;
  // Returns the unrounded, floating point width of the content element which does not include transformations.
  // `offsetWidth` would not work because this returns a rounded number of the element's layout width and `getBoundingClientRect.width` would also not work because it returns an exact number of the rendered width which can include transformations.
  // If this element is the reference element return element.getBoundingClientRect().width since we don't have to be as strict with the width. If we used getComputedStyle then the reference element has to have a display other than inline set on it.
  const width = isReference
    ? boundingWidth
    : parseFloat(getComputedStyle(element).width);

  return {
    top,
    bottom,
    left,
    right,
    height,
    width,
  };
};

export function getElementDocumentPosition(
  element: HTMLElement | null,
  scrollContainer?: HTMLElement | null,
  isReference?: boolean,
): ElementPosition {
  if (!element) {
    return defaultElementPosition;
  }

  const { top, bottom, left, right, height, width } = getElementPosition(
    element,
    isReference,
  );

  if (scrollContainer) {
    const { scrollTop, scrollLeft } = scrollContainer;
    const {
      top: offsetTop,
      bottom: offsetBottom,
      left: offsetLeft,
      right: offsetRight,
    } = scrollContainer.getBoundingClientRect();

    return {
      top: top + scrollTop - offsetTop,
      bottom: bottom + scrollTop - offsetBottom,
      left: left + scrollLeft - offsetLeft,
      right: right + scrollLeft - offsetRight,
      height,
      width,
    };
  }

  const { scrollX, scrollY } = window;

  return {
    top: top + scrollY,
    bottom: bottom + scrollY,
    left: left + scrollX,
    right: right + scrollX,
    height,
    width,
  };
}

export const getFloatingPlacement = (
  align: Align,
  justify: Justify,
): Placement => {
  if (align === Align.CenterHorizontal) {
    align = Align.Right;
  }

  if (align === Align.CenterVertical) {
    align = Align.Bottom;
  }

  return justify === Justify.Middle ? align : `${align}-${justify}`;
};

export const getWindowSafePlacementValues = (placement: Placement) => {
  const [floatingAlign, floatingJustify] = placement.split('-');

  const newAlign = floatingAlign as Align;
  const newJustify = !floatingJustify
    ? Justify.Middle
    : (floatingJustify as Justify);

  return {
    align: newAlign,
    justify: newJustify,
  };
};

export const getExtendedPlacementValue = ({
  placement,
  align: alignProp,
  justify: justifyProp,
}: {
  placement: Placement;
  align: Align;
  justify: Justify;
}): ExtendedPlacement => {
  if (alignProp === Align.CenterHorizontal) {
    if (justifyProp === Justify.Start) {
      return 'center-start';
    }

    if (justifyProp === Justify.End) {
      return 'center-end';
    }

    return 'center';
  }

  if (alignProp === Align.CenterVertical) {
    if (justifyProp === Justify.Start) {
      return 'right';
    }

    if (justifyProp === Justify.End) {
      return 'left';
    }

    return 'center';
  }

  return placement;
};
