import clamp from 'lodash/clamp';

import { css } from '@leafygreen-ui/emotion';
import { Align, ElementPosition, Justify } from '@leafygreen-ui/popover';

import { TooltipVariant } from './Tooltip.types';
import {
  borderRadiuses,
  CONTAINER_SIZE,
  NOTCH_OVERLAP,
  NOTCH_WIDTH,
} from './tooltipConstants';

interface NotchPositionStylesArgs {
  align: Align;
  justify: Justify;
  triggerRect: ElementPosition | DOMRect | ClientRect | null;
  isCompact: boolean;
}

export function notchPositionStyles({
  align,
  justify,
  triggerRect,
  isCompact,
}: NotchPositionStylesArgs) {
  if (!align || !justify || !triggerRect || isCompact) {
    return {
      notchContainer: '',
      notch: '',
      tooltip: '',
    };
  }

  type Styles = 'left' | 'right' | 'top' | 'bottom' | 'margin' | 'transform';
  const notchStyleObj: Partial<Record<Styles, string>> = {};
  const containerStyleObj: Partial<Record<Styles, string>> = {};

  /**
   * The bounds used to clamp the notchOffset value.
   * Should match the border-radius of the tooltip
   */
  const notchOffsetLowerBound = borderRadiuses[TooltipVariant.Default];

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
      notchOffsetActual = triggerRect.width / 2 - CONTAINER_SIZE / 2;
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
        notchStyleObj.top = `${NOTCH_OVERLAP}px`;
      } else {
        containerStyleObj.bottom = 'calc(100% - 1px)';
        notchStyleObj.bottom = `${NOTCH_OVERLAP}px`;
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
      notchOffsetActual = triggerRect.height / 2 - CONTAINER_SIZE / 2;
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
        notchStyleObj.left = `${NOTCH_OVERLAP}px`;
        notchStyleObj.transform = `rotate(-90deg)`;
      } else {
        containerStyleObj.right = 'calc(100% - 1px)';
        notchStyleObj.right = `${NOTCH_OVERLAP}px`;
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
      width: ${CONTAINER_SIZE}px;
      height: ${CONTAINER_SIZE}px;
      overflow: hidden;
      margin: auto;
      pointer-events: none;
      ${css(containerStyleObj)};
    `,
    notch: css`
      ${css(notchStyleObj)};
      position: absolute;
      width: ${NOTCH_WIDTH}px;
      height: ${NOTCH_WIDTH}px; // Keep it square. Rotating is simpler
      margin: 0;
    `,
    tooltip: css`
      min-width: ${notchOffset * 2 + CONTAINER_SIZE}px;
      transform: ${tooltipOffsetTransform};
    `,
  };
}
