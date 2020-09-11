import { css } from '@leafygreen-ui/emotion';
import { Align, Justify } from '@leafygreen-ui/popover';
import clamp from 'lodash/clamp';

export function notchPositionStyles(
  align: Align,
  justify: Justify,
  triggerRect: DOMRect | ClientRect | null,
) {
  if (!align || !justify || !triggerRect) {
    return {
      notchContainer: '',
      notch: '',
      tooltip: '',
    };
  }

  const containerSize = 15;
  const notchSize = 8;
  const notchOverlap = -notchSize / 2;

  type Styles = 'left' | 'right' | 'top' | 'bottom' | 'margin';
  const notchStyleObj: Partial<Record<Styles, string>> = {};
  const containerStyleObj: Partial<Record<Styles, string>> = {};

  let notchOffset = 0;

  switch (align) {
    case 'top':
    case 'bottom':
      notchOffset = clamp((triggerRect.width / 2) - (containerSize / 2), 5, 100);
      notchStyleObj.left = '0px';
      notchStyleObj.right = '0px';

      if (align === 'top') {
        containerStyleObj.top = '100%';
        notchStyleObj.top = `${notchOverlap}px`;
      } else {
        containerStyleObj.bottom = '100%';
        notchStyleObj.bottom = `${notchOverlap}px`;
      }

      switch (justify) {
        case Justify.Start:
          containerStyleObj.left = `${notchOffset}px`;
          break;

        case Justify.Middle:
        case Justify.Fit:
          containerStyleObj.left = '0px';
          containerStyleObj.right = '0px';
          break;

        case Justify.End:
          containerStyleObj.right = `${notchOffset}px`;
          break;
      }

      break;

    case 'left':
    case 'right':
      notchOffset = clamp((triggerRect.height / 2) - (containerSize / 2), 5, 100);
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
          break;

        case Justify.Middle:
        case Justify.Fit:
          containerStyleObj.top = '0px';
          containerStyleObj.bottom = '0px';
          break;

        case Justify.End:
          containerStyleObj.bottom = `${notchOffset}px`;
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
      ${css(containerStyleObj)};
    `,
    notch: css`
      ${css(notchStyleObj)};
      position: absolute;
      transform: rotate(45deg);
      width: 8px;
      height: 8px;
      margin: auto;
    `,
    tooltip: css`
      min-width: ${notchOffset * 2 + containerSize}px;
    `,
  };
}
