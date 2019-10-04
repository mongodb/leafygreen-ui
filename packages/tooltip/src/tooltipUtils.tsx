import { css } from '@leafygreen-ui/emotion';

export function trianglePosition(
  alignment: string,
  justification: string,
  triggerRect: DOMRect | ClientRect | null,
) {
  if (!alignment || !justification || !triggerRect) {
    return '';
  }

  const borderOffset = 'calc(100% - 1px)';

  const containerSize = 15;
  const notchSize = 8;
  const containerOffsetX = (triggerRect.width - containerSize) / 2;
  const containerOffsetY = (triggerRect.height - containerSize) / 2;
  const notchOverlap = -notchSize / 2;
  const containerStyleObj: any = {};
  const notchStyleObj: any = {};

  switch (alignment) {
    case 'top':
    case 'bottom':
      notchStyleObj.left = 0;
      notchStyleObj.right = 0;

      if (alignment === 'top') {
        containerStyleObj.top = `${borderOffset}`;
        notchStyleObj.top = `${notchOverlap}px`;
      } else {
        containerStyleObj.bottom = `${borderOffset}`;
        notchStyleObj.bottom = `${notchOverlap}px`;
      }

      switch (justification) {
        case 'left':
          containerStyleObj.left = `${containerOffsetX}px`;
          break;

        case 'center-horizontal':
          containerStyleObj.left = '0px';
          containerStyleObj.right = '0px';
          containerStyleObj.margin = 'auto';
          break;

        case 'right':
          containerStyleObj.right = `${containerOffsetX}px`;
          break;
      }

      break;

    case 'left':
    case 'right':
      notchStyleObj.top = 0;
      notchStyleObj.bottom = 0;

      if (alignment === 'left') {
        notchStyleObj.left = `${notchOverlap}px`;
        containerStyleObj.left = `calc(100% - 1.8px)`;
      } else {
        notchStyleObj.right = `${notchOverlap}px`;
        containerStyleObj.right = `${borderOffset}`;
      }

      switch (justification) {
        case 'top':
          containerStyleObj.top = `${containerOffsetY}px`;
          break;

        case 'center-vertical':
          containerStyleObj.top = '0px';
          containerStyleObj.bottom = '0px';
          containerStyleObj.margin = 'auto';
          break;

        case 'bottom':
          containerStyleObj.bottom = `${containerOffsetY}px`;
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
