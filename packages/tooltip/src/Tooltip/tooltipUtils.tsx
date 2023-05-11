import clamp from 'lodash/clamp';

import { css } from '@leafygreen-ui/emotion';
import { Align, ElementPosition, Justify } from '@leafygreen-ui/popover';

import { borderRadius, notchHeight, notchWidth } from './tooltipConstants';

interface NotchPositionStylesArgs {
  align: Align;
  justify: Justify;
  triggerRect: ElementPosition | DOMRect | ClientRect | null;
}

export function notchPositionStyles({
  align,
  justify,
  triggerRect,
}: NotchPositionStylesArgs) {
  if (!align || !justify || !triggerRect) {
    return {
      notchContainer: '',
      notch: '',
      tooltip: '',
    };
  }

  const containerSize = notchWidth;
  const notchOverlap = -(containerSize - notchHeight) / 2;

  type Styles = 'left' | 'right' | 'top' | 'bottom' | 'margin' | 'transform';
  const notchStyleObj: Partial<Record<Styles, string>> = {};
  const containerStyleObj: Partial<Record<Styles, string>> = {};

  /**
   * The bounds used to clamp the notchOffset value.
   * Should match the border-radius of the tooltip
   */
  const notchOffsetLowerBound = borderRadius;

  /**
   * This number is somewhat "magical", but adjusted for the Tooltip alignment.
   * Calculating the exact value needed here requires setting a ref on the Tooltip content wrapper, and getting the height / width of it.
   * The problem was that the height / width changes when the open prop is set, causing the notch to lose its positioning before the tooltip transitions out in some cases.
   */
  let notchOffsetUpperBound = notchOffsetLowerBound * 2;

  /**
   * The un-clamped value that would exactly center the tooltip notch relative to the trigger.
   */
  let notchOffsetActual: number;

  /**
   * The clamped value that makes a best-attempt to center the notch relative to the trigger,
   * while also ensuring that the notch is positioned within the bounds of the tooltip itself,
   * and still has the appearance of an alignment.
   */
  let notchOffset = 0;

  /**
   * Boolean derived from the notchOffsetActual and notchOffsetLowerBound that determines if the trigger
   * is small enough to make a transformation of the tooltip itself necessary.
   */
  let shouldTransformPosition: boolean;

  /**
   * When the trigger is smaller than the minimum offset we require to position the notch over the trigger,
   * we calculate a transformation to apply to the entire tooltip so that the notch centers on that element.
   * This is particularly important for things like icons, and icon buttons where without this transformation,
   * the tooltip's notch could be positioned entirely off of the trigger.
   */
  let tooltipOffsetTransform = '';

  switch (align) {
    case 'top':
    case 'bottom':
      notchOffsetUpperBound = notchOffsetLowerBound * 3;
      notchOffsetActual = triggerRect.width / 2 - containerSize / 2;
      notchOffset = clamp(
        notchOffsetActual,
        notchOffsetLowerBound,
        notchOffsetUpperBound,
      );
      shouldTransformPosition = notchOffsetActual <= notchOffsetLowerBound;

      notchStyleObj.left = `0px`;
      notchStyleObj.right = `0px`;

      if (align === 'top') {
        containerStyleObj.top = 'calc(100% - 1px)';
        notchStyleObj.top = `${notchOverlap}px`;
      } else {
        containerStyleObj.bottom = 'calc(100% - 1px)';
        notchStyleObj.bottom = `${notchOverlap}px`;
        notchStyleObj.transform = `rotate(180deg)`;
      }

      switch (justify) {
        case Justify.Start:
          containerStyleObj.left = `${notchOffset}px`;

          if (shouldTransformPosition) {
            tooltipOffsetTransform = `translateX(-${
              notchOffsetLowerBound - notchOffsetActual
            }px)`;
          }

          break;

        case Justify.Middle:
          containerStyleObj.left = '0px';
          containerStyleObj.right = '0px';

          break;

        case Justify.Fit:
          containerStyleObj.left = `${notchOffset}px`;

          if (shouldTransformPosition) {
            tooltipOffsetTransform = `translateX(-${
              notchOffsetLowerBound - notchOffsetActual
            }px)`;
          }

          break;

        case Justify.End:
          containerStyleObj.right = `${notchOffset}px`;

          if (shouldTransformPosition) {
            tooltipOffsetTransform = `translateX(${
              notchOffsetLowerBound - notchOffsetActual
            }px)`;
          }

          break;
      }

      break;

    case 'left':
    case 'right':
      notchOffsetUpperBound = notchOffsetLowerBound * 2;
      notchOffsetActual = triggerRect.height / 2 - containerSize / 2;
      notchOffset = clamp(
        notchOffsetActual,
        notchOffsetLowerBound,
        notchOffsetUpperBound,
      );
      shouldTransformPosition = notchOffsetActual <= notchOffsetLowerBound;

      notchStyleObj.top = `0px`;
      notchStyleObj.bottom = `0px`;

      if (align === 'left') {
        containerStyleObj.left = 'calc(100% - 1px)';
        notchStyleObj.left = `${notchOverlap}px`;
        notchStyleObj.transform = `rotate(-90deg)`;
      } else {
        containerStyleObj.right = 'calc(100% - 1px)';
        notchStyleObj.right = `${notchOverlap}px`;
        notchStyleObj.transform = `rotate(90deg)`;
      }

      switch (justify) {
        case Justify.Start:
          containerStyleObj.top = `${notchOffset}px`;

          if (shouldTransformPosition) {
            tooltipOffsetTransform = `translateY(-${
              notchOffsetLowerBound - notchOffsetActual
            }px)`;
          }

          break;

        case Justify.Middle:
          containerStyleObj.top = '0px';
          containerStyleObj.bottom = '0px';
          break;

        case Justify.Fit:
          containerStyleObj.top = `${notchOffset}px`;

          if (shouldTransformPosition) {
            tooltipOffsetTransform = `translateY(-${
              notchOffsetLowerBound - notchOffsetActual
            }px)`;
          }
          break;

        case Justify.End:
          containerStyleObj.bottom = `${notchOffset}px`;

          if (shouldTransformPosition) {
            tooltipOffsetTransform = `translateY(${
              notchOffsetLowerBound - notchOffsetActual
            }px)`;
          }

          break;
      }

      break;
  }

  return {
    notchContainer: css`
      position: absolute;
      width: ${containerSize}px;
      height: ${containerSize}px;
      overflow: hidden;
      margin: auto;
      pointer-events: none;
      ${css(containerStyleObj)};
    `,
    notch: css`
      ${css(notchStyleObj)};
      position: absolute;
      width: ${notchWidth}px;
      height: ${notchWidth}px; // Keep it square. Rotating is simpler
      margin: 0;
    `,
    tooltip: css`
      min-width: ${notchOffset * 2 + containerSize}px;
      transform: ${tooltipOffsetTransform};
    `,
  };
}
