import { css } from '@leafygreen-ui/emotion';

export function trianglePosition(align, rect, color) {
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

      top = `${rect.bottom - rect.height - 15}px`;
      borderTop = '10px solid pink';
      borderLeft = '10px solid transparent';
      borderRight = '10px solid transparent';
      break;
    case 'bottom':
      left = `${rect.left - 10 + rect.width / 2}px`;

      top = `${rect.bottom + rect.height - 15}px`;
      borderBottom = '10px solid pink';
      borderLeft = '10px solid transparent';
      borderRight = '10px solid transparent';
      break;
    case 'left':
      left = `${rect.left - 15}px`;

      top = `${rect.bottom - 10 - rect.height / 2}px`;

      borderBottom = '10px solid transparent';
      borderTop = '10px solid transparent';
      borderLeft = '10px solid pink';
      break;
    case 'right':
      left = `${rect.left + rect.width + 6}px`;

      top = `${rect.bottom - 10 - rect.height / 2}px`;

      borderBottom = '10px solid transparent';
      borderTop = '10px solid transparent';
      borderRight = '10px solid pink';
      break;
  }

  return css`
    left: ${left};
    border-top: ${borderTop};
    border-bottom: ${borderBottom};
    border-left: ${borderLeft};
    border-right: ${borderRight};
    top: ${top};
    position: absolute;
    width: 0;
    height: 0;
    transform: translate3d(15, 0, 0) scale(1);
    transition: 'border 150ms ease-in-out, transform 150ms ease-in-out';
  `;
}
