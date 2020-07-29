import { css } from '@leafygreen-ui/emotion';
import { Align, Justify } from '@leafygreen-ui/popover';

export function trianglePosition(
  align: Align,
  justify: Justify,
  triggerRect: DOMRect | ClientRect | null,
) {
  if (!align || !justify || !triggerRect) {
    return '';
  }

  const containerSize = 15;
  const notchSize = 8;
  const notchOverlap = -notchSize / 2;

  type Styles = 'left' | 'right' | 'top' | 'bottom' | 'margin';
  const notchStyleObj: { [K in Styles]?: string } = {};
  const containerStyleObj: { [K in Styles]?: string } = {};

  switch (align) {
    case 'top':
    case 'bottom':
      notchStyleObj.left = '0px';
      notchStyleObj.right = '0px';

      if (align === 'top') {
        containerStyleObj.bottom = `-${containerSize}px`;
        notchStyleObj.top = `${notchOverlap}px`;
      } else {
        containerStyleObj.top = `-${containerSize}px`;
        notchStyleObj.bottom = `${notchOverlap}px`;
      }

      switch (justify) {
        case Justify.Start:
          containerStyleObj.left = `${containerSize}px`;
          break;

        case Justify.Middle:
        case Justify.Fit:
          containerStyleObj.left = '0px';
          containerStyleObj.right = '0px';
          break;

        case Justify.End:
          containerStyleObj.left = `calc(100% - ${
            notchSize + containerSize
          }px)`;
          break;
      }

      break;

    case 'left':
    case 'right':
      notchStyleObj.top = '0px';
      notchStyleObj.bottom = '0px';

      if (align === 'left') {
        notchStyleObj.left = `${notchOverlap}px`;
        containerStyleObj.right = `-${containerSize}px`;
      } else {
        notchStyleObj.right = `${notchOverlap}px`;
        containerStyleObj.left = `-${containerSize}px`;
      }

      switch (justify) {
        case Justify.Start:
          containerStyleObj.top = `${notchSize}px`;
          break;

        case Justify.Middle:
        case Justify.Fit:
          containerStyleObj.top = '0px';
          containerStyleObj.bottom = '0px';
          break;

        case Justify.End:
          containerStyleObj.top = `calc(100% - ${notchSize + containerSize}px)`;
          break;
      }

      break;
  }

  return {
    containerStyle: css`
      position: absolute;
      width: ${containerSize}px;
      height: ${containerSize}px;
      overflow: hidden;
      margin: auto;
      ${css(containerStyleObj)};
    `,
    notchStyle: css`
      ${css(notchStyleObj)};
      position: absolute;
      transform: rotate(45deg);
      width: 8px;
      height: 8px;
      margin: auto;
    `,
  };
}
