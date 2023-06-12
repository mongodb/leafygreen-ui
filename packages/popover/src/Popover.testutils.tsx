import { Align, Justify } from './types';

export const getJustify = (a: Align, j: Justify): string => {
  if (a === 'left' || a === 'right') {
    return a === 'right' ? 'start' : 'end';
  }

  return j === 'middle' || j === 'fit' ? 'center' : (j as string);
};

export const getAlign = (a: Align) => {
  return a === 'top' ? 'end' : a === 'bottom' ? 'start' : 'center';
};
