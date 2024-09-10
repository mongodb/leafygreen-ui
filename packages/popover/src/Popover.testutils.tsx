import { Align, Justify } from './Popover.types';

/**
 * @internal
 */
export const getJustify = (a: Align, j: Justify): string => {
  switch (a) {
    case 'left':
      return 'end';
    case 'right':
      return 'start';

    case 'top':
    case 'bottom':
    case 'center-vertical':
    case 'center-horizontal':
    default:
      switch (j) {
        case 'middle':
        case 'fit':
          return 'center';

        default:
          return j;
      }
  }
};

/**
 * @internal
 */
export const getAlign = (a: Align, j: Justify) => {
  switch (a) {
    case 'top':
      return 'end';
    case 'bottom':
      return 'start';
    default:
      switch (j) {
        case 'middle':
        case 'fit':
          return 'center';

        default:
          return j;
      }
  }
};
