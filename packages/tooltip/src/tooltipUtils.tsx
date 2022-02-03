import { css } from '@leafygreen-ui/emotion';
import { Align, ElementPosition, Justify } from '@leafygreen-ui/popover';
import clamp from 'lodash/clamp';

export function notchPositionStyles(
  align: Align,
  justify: Justify,
  triggerRect: ElementPosition | DOMRect | ClientRect | null,
) {
  if (!align || !justify || !triggerRect) {
    return {
      notchContainer: '',
      notch: '',
      tooltip: '',
    };
  }

  const containerSize = 20;
  const notchSize = 10;
  const notchOverlap = -notchSize / 2;

  type Styles = 'left' | 'right' | 'top' | 'bottom' | 'margin';
  const notchStyleObj: Partial<Record<Styles, string>> = {};
  const containerStyleObj: Partial<Record<Styles, string>> = {};

  /**
   * The bounds used to clamp the notchOffset value
   */
  const notchOffsetLowerBound = 5;

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
  let transformPosition: boolean;

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
      transformPosition = notchOffsetActual <= notchOffsetLowerBound;

      notchStyleObj.left = '0px';
      notchStyleObj.right = '0px';

      if (align === 'top') {
        containerStyleObj.top = 'calc(100% - 1px)';
        notchStyleObj.top = `${notchOverlap}px`;
      } else {
        containerStyleObj.bottom = 'calc(100% - 1px)';
        notchStyleObj.bottom = `${notchOverlap}px`;
      }

      switch (justify) {
        case Justify.Start:
          containerStyleObj.left = `${notchOffset}px`;

          if (transformPosition) {
            tooltipOffsetTransform = `translateX(-${
              notchOffsetLowerBound - notchOffsetActual
            }px)`;
          }

          break;

        case Justify.Middle:
        case Justify.Fit:
          containerStyleObj.left = '0px';
          containerStyleObj.right = '0px';
          break;

        case Justify.End:
          containerStyleObj.right = `${notchOffset}px`;

          if (transformPosition) {
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
      transformPosition = notchOffsetActual <= notchOffsetLowerBound;

      notchStyleObj.top = '0px';
      notchStyleObj.bottom = '0px';

      if (align === 'left') {
        notchStyleObj.left = `${notchOverlap}px`;
        containerStyleObj.left = '100%';
      } else {
        notchStyleObj.right = `${notchOverlap}px`;
        containerStyleObj.right = '100%';
      }

      switch (justify) {
        case Justify.Start:
          containerStyleObj.top = `${notchOffset}px`;

          if (transformPosition) {
            tooltipOffsetTransform = `translateY(-${
              notchOffsetLowerBound - notchOffsetActual
            }px)`;
          }

          break;

        case Justify.Middle:
        case Justify.Fit:
          containerStyleObj.top = '0px';
          containerStyleObj.bottom = '0px';
          break;

        case Justify.End:
          containerStyleObj.bottom = `${notchOffset}px`;

          if (transformPosition) {
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
      transform: rotate(45deg);
      width: ${notchSize}px;
      height: ${notchSize}px;
      margin: auto;
    `,
    tooltip: css`
      min-width: ${notchOffset * 2 + containerSize}px;
      transform: ${tooltipOffsetTransform};
    `,
  };
}
