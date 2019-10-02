import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

export function trianglePosition(
  align: string,
  rect: DOMRect | ClientRect | null,
  variant: string,
) {
  const borderColor =
    variant === 'light' ? uiColors.gray.light3 : uiColors.gray.dark3;

  let left = '',
    borderTop = '',
    top = '',
    borderBottom = '',
    borderLeft = '',
    borderRight = '';

  if (!align || !rect) {
    return '';
  }

  switch (align) {
    case 'top':
      left = `${rect.left - 10 + rect.width / 2}px`;
      top = `${rect.top - 15 + window.scrollY}px`;
      borderLeft = '8px solid transparent';
      borderRight = '8px solid transparent';
      borderTop = `8px solid ${borderColor}`;
      break;

    case 'bottom':
      left = `${rect.left - 10 + rect.width / 2}px`;
      top = `${rect.bottom + 8 + window.scrollY}px`;
      borderLeft = '8px solid transparent';
      borderRight = '8px solid transparent';
      borderBottom = `8px solid ${borderColor}`;
      break;

    case 'left':
      left = `${rect.left - 15.5}px`;
      top = `${rect.top - 8 + rect.height / 2}px`;
      borderTop = '8px solid transparent';
      borderBottom = '8px solid transparent';
      borderLeft = `8px solid ${borderColor}`;
      break;

    case 'right':
      left = `${rect.right + 8}px`;
      top = `${rect.top - 8 + rect.height / 2}px`;
      borderTop = '8px solid transparent';
      borderBottom = '8px solid transparent';
      borderRight = `8px solid ${borderColor}`;
      break;
  }

  return css`
    position: absolute;
    width: 0;
    height: 0;
    left: ${left};
    border-top: ${borderTop};
    border-bottom: ${borderBottom};
    border-left: ${borderLeft};
    border-right: ${borderRight};
    top: ${top};
    transform: translate3d(15, 0, 0) scale(1);
    transition: 'border 150ms ease-in-out, transform 150ms ease-in-out';
  `;
}
