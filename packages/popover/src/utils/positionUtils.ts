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

/**
 * Floating UI supports 12 placements out-of-the-box. {@see https://floating-ui.com/docs/useFloating#placement}.
 * In addition to these placements, we override the `align` prop when it is set to 'center-horizontal' or
 * 'center-vertical' to create custom placements {@see https://floating-ui.com/docs/offset#creating-custom-placements}
 */
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

  if (justify === Justify.Fit) {
    justify = Justify.Middle;
  }

  return justify === Justify.Middle ? align : `${align}-${justify}`;
};

/**
 * Helper function to derive window-safe align and justify values that are used when rendering
 * children. The placement calculated by Floating UI does not explicitly specify the justify
 * value when it is 'middle'
 */
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

/**
 * Floating UI supports 12 placements out-of-the-box. {@see https://floating-ui.com/docs/useFloating#placement}.
 * We extend on these placements when the `align` prop is set to 'center-horizontal' or 'center-vertical'
 */
export const getExtendedPlacementValue = ({
  placement,
  align: alignProp,
}: {
  placement: Placement;
  align: Align;
}): ExtendedPlacement => {
  // Use the default placements if the `align` prop is not 'center-horizontal' or 'center-vertical'
  if (
    alignProp !== Align.CenterHorizontal &&
    alignProp !== Align.CenterVertical
  ) {
    return placement;
  }

  // Otherwise, we need to adjust the placement based on the `align` prop
  // The `floatingJustify` value should be 'start', 'end', or undefined.
  const [_, floatingJustify] = placement.split('-');

  // If the calculated justify value is 'start'
  if (floatingJustify === Justify.Start) {
    // and the `align` prop is 'center-horizontal',
    if (alignProp === Align.CenterHorizontal) {
      // we center the floating element horizontally and place it aligned to the start of the reference point
      return 'center-start';
      // and the `align` prop is 'center-vertical',
    } else if (alignProp === Align.CenterVertical) {
      // we center the floating element vertically and place it to the right of the reference point
      return 'right';
    }
  }

  // If the calculated justify value is 'end'
  if (floatingJustify === Justify.End) {
    // and the `align` prop is 'center-horizontal',
    if (alignProp === Align.CenterHorizontal) {
      // we center the floating element horizontally and place it aligned to the end of the reference point
      return 'center-end';
      // and the `align` prop is 'center-vertical',
    } else if (alignProp === Align.CenterVertical) {
      // we center the floating element vertically and place it to the left of the reference point
      return 'left';
    }
  }

  // If the calculated justify value calculated is not specified, we center the floating element
  return 'center';
};
